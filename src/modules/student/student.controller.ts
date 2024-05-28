import { Request, Response } from "express";
import studentValidationSchema from "./student.validation";
import { StudentService } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  const validateData = studentValidationSchema.parse(req.body);
  const student = await StudentService.createStudent(validateData);
  return res.status(200).send({
    success: true,
    message: "Student created successfully",
    data: student,
  });
};
export const StudentController = {
  createStudent,
};
