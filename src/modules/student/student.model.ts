import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const userNameSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { _id: false }
);

const guardianSchema = new Schema(
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

const localGuardianSchema = new Schema(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const studentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
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

const StudentModel = model("Student", studentSchema);

export default StudentModel;
