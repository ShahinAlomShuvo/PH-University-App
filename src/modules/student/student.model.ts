import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentModel,
  TUserName,
} from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { _id: false }
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
  },
  { _id: false }
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: { type: String, required: true },
    // user: { type: Types.ObjectId, ref: "User", required: true },
    password: { type: String, required: true },
    name: { type: userNameSchema, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: Date },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

// pre save middleware

studentSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds)
  );
  next();
});

// post save middleware

studentSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

studentSchema.post("find", async function (docs, next) {
  docs.forEach((doc: any) => {
    doc.password = "";
  });
  next();
});

studentSchema.post("findOne", async function (doc, next) {
  if (doc) doc.password = "";
  next();
});

// query middleware
studentSchema.pre("find", function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// create a custom static method

studentSchema.statics.isStudentExist = async function (id: string) {
  // const student = await StudentModel.findOne({ id });
  const student = await this.findOne({ id });
  return student;
};

// crate a custom instance method
// studentSchema.methods.isStudentExist = async function (id: string) {
//   const student = await StudentModel.findOne({ id });
//   return student;
// };

const StudentModel = model<TStudent, TStudentModel>("Student", studentSchema);

export default StudentModel;
