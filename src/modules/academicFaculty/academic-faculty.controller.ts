import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.util";
import { AcademicFacultyServices } from "./academic-faculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFaculty(req.body);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty created successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFaculties();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculties fetched successfully",
    data: result,
  });
});

const getAcademicFacultyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.getAcademicFacultyById(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty fetched successfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFaculty(
    id,
    req.body
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty updated successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFacultyById,
  updateAcademicFaculty,
};
