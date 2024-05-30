import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterName, required: true },
    year: { type: String, required: true },
    code: { type: String, enum: AcademicSemesterCode, required: true },
    startMonth: { type: String, enum: Months, required: true },
    endMonth: { type: String, enum: Months, required: true },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre("save", async function (next) {
  const isExist = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExist) {
    throw new Error("Academic semester is already exist");
  }
  next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
