import studentValidationSchema from "./student.validation";
import { StudentService } from "./student.service";
import sendResponse from "../../utils/sendResponse.util";
import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync.utils";

const getAllStudents = catchAsync(async (req, res) => {
  const students = await StudentService.getAllStudents();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students fetched successfully",
    data: students,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const student = await StudentService.getStudentById(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student fetched successfully",
    data: student,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  await StudentService.deleteStudent(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: null,
  });
});
export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
};
