import httpStatus from "http-status";
import { ApiError } from "../../utils/apiError.utils";
import {
  TAcademicSemester,
  TNameCodeMapper,
} from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";
import { nameCodeMapper } from "./academicSemester.constant";

const createAcademicSemester = async (
  academicSemesterData: TAcademicSemester
) => {
  if (nameCodeMapper[academicSemesterData.name] !== academicSemesterData.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid academic semester code"
    );
  }

  const academicSemester = await AcademicSemesterModel.create(
    academicSemesterData
  );
  return academicSemester;
};

const getAllAcademicSemesters = async () => {
  const academicSemesters = await AcademicSemesterModel.find();
  return academicSemesters;
};

const getAcademicSemesterById = async (id: string) => {
  const academicSemester = await AcademicSemesterModel.findById(id);
  if (!academicSemester) {
    throw new ApiError(httpStatus.NOT_FOUND, "Academic semester not found");
  }
  return academicSemester;
};

const updateAcademicSemester = async (
  id: string,
  updateData: Partial<TAcademicSemester>
) => {
  const isExist = await AcademicSemesterModel.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Academic semester not found");
  }

  if (
    updateData.name &&
    updateData.code &&
    nameCodeMapper[updateData.name] !== updateData.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid academic semester code"
    );
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemester,
};
