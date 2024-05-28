import { TStudent } from "./student.interface";
import StudentModel from "./student.model";

const createStudent = async (payload: TStudent) => {
  const student = await StudentModel.create(payload);
  return student;
};

export const StudentService = {
  createStudent,
};
