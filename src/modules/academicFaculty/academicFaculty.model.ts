import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academic-faculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const AcademicFacultyModel = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
