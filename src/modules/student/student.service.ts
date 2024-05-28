import { StudentModel } from "./student.model";
import { TStudent } from "./student.interface";

const createStudent = async (payload: TStudent) => {
  const student = await StudentModel.create(payload);
  return student;
};

export const StudentService = {
  createStudent,
};
