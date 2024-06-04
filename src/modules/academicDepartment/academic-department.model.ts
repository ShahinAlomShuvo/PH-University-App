import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academic-department.interface";
import { ApiError } from "../../utils/apiError.utils";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Academic department already exist"
    );
  }
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartmentModel.findOne(query);
  if (!isDepartmentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Academic department not found");
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
