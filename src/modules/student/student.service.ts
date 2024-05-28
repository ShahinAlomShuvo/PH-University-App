import { TStudent } from "./student.interface";
import StudentModel from "./student.model";

const createStudent = async (payload: TStudent) => {
  //here "create" is a mongoose builtin static method
  //here i use custom static method "isStudentExist"
  if (await StudentModel.isStudentExist(payload.id)) {
    throw new Error("Student already exist");
  }
  const student = await StudentModel.create(payload);

  // here "save" is a mongoose builtin instance method
  // here i use custom instance method "isStudentExist"

  // const student = new StudentModel(payload);
  // if (await student.isStudentExist(payload.id)) {
  //   throw new Error("Student already exist");
  // }
  // await student.save();
  return student;
};

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
  createStudent,
  getStudentById,
  getAllStudents,
  deleteStudent,
};
