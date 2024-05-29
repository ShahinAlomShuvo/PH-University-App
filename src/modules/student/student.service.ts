import { TStudent } from "./student.interface";
import StudentModel from "./student.model";

const getStudentById = async (id: string) => {
  const student = await StudentModel.findById(id);
  if (!student) {
    throw new Error("Student not found");
  }
  return student;
};

const getAllStudents = async () => {
  const students = await StudentModel.find();
  return students;
};

const deleteStudent = async (id: string) => {
  const student = await getStudentById(id);

  if (!student) {
    throw new Error("Student not found");
  }

  return await StudentModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

export const StudentService = {
  getStudentById,
  getAllStudents,
  deleteStudent,
};
