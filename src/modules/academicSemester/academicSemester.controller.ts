import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.util";
import { AcademicSemesterServices } from "./academicSemister.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemester(
    req.body
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester created successfully",
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesters();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semesters fetched successfully",
    data: result,
  });
});

const getAcademicSemesterById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.getAcademicSemesterById(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester fetched successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemester(
    id,
    req.body
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester updated successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemester,
};
