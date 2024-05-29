import { Request, Response } from "express";
import studentValidationSchema from "./student.validation";
import { StudentService } from "./student.service";

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentService.getAllStudents();
    return res.status(200).send({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await StudentService.getStudentById(id);
    return res.status(200).send({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await StudentService.deleteStudent(id);
    return res.status(200).send({
      success: true,
      message: "Student deleted successfully",
      data: null,
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};
export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
};
