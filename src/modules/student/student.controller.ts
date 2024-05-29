import { NextFunction, Request, Response } from "express";
import studentValidationSchema from "./student.validation";
import { StudentService } from "./student.service";
import sendResponse from "../../utils/sendResponse.util";
import httpStatus from "http-status";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await StudentService.getAllStudents();
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await StudentService.getStudentById(id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await StudentService.deleteStudent(id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
};
