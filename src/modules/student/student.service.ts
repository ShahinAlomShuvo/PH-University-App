import httpStatus from "http-status";
import { ApiError } from "../../utils/apiError.utils";
import { TStudent } from "./student.interface";
import StudentModel from "./student.model";

const getStudentById = async (id: string) => {
  const student = await StudentModel.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("user");
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  return student;
};

const getAllStudents = async () => {
  const students = await StudentModel.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("user");
  return students;
};

const deleteStudent = async (id: string) => {
  const student = await getStudentById(id);

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
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
