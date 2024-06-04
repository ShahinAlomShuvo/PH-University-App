import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.utils";
import { AcademicDepartmentServices } from "./academic-department.service";
import sendResponse from "../../utils/sendResponse.util";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const academicDepartment =
    await AcademicDepartmentServices.createAcademicDepartment(req.body);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department created successfully",
    data: academicDepartment,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const academicDepartments =
    await AcademicDepartmentServices.getAllAcademicDepartments();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic departments fetched successfully",
    data: academicDepartments,
  });
});

const getAcademicDepartmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const academicDepartment =
    await AcademicDepartmentServices.getAcademicDepartmentById(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department fetched successfully",
    data: academicDepartment,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicDepartmentServices.updateAcademicDepartment(
    id,
    req.body
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department updated successfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getAcademicDepartmentById,
  updateAcademicDepartment,
};
