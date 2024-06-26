import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentModel,
} from "./student.interface";
import httpStatus from "http-status";
import { ApiError } from "../../errors/apiError.utils";
import { TUserName } from "../../common/common.interface";
import { BloodGroup, Gender } from "../../common/common.constant";
import { userNameSchema } from "../../common/common.model";

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
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: userNameSchema, required: true },
    gender: { type: String, enum: Gender, required: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: BloodGroup,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

// post save middleware

// studentSchema.post("find", async function (docs, next) {
//   docs.forEach((doc: any) => {
//     doc.password = "";
//   });
//   next();
// });

// studentSchema.post("findOne", async function (doc, next) {
//   if (doc) doc.password = "";
//   next();
// });

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
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  return student;
};

// crate a custom instance method
// studentSchema.methods.isStudentExist = async function (id: string) {
//   const student = await StudentModel.findOne({ id });
//   return student;
// };

const StudentModel = model<TStudent, TStudentModel>("Student", studentSchema);

export default StudentModel;
