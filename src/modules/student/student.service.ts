import httpStatus from "http-status";
import { TStudent } from "./student.interface";
import StudentModel from "./student.model";
import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import { ApiError } from "../../errors/apiError.utils";

const getStudentById = async (id: string) => {
  const student = await StudentModel.findOne({ id })
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

const updateStudent = async (id: string, payload: Partial<TStudent>) => {
  await StudentModel.isStudentExist(id);

  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const updateStudentData: Record<string, any> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updateStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updateStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      updateStudentData[`localGuardian.${key}`] = value;
    }
  }
  const updateStudent = await StudentModel.findOneAndUpdate(
    { id },
    updateStudentData,
    {
      new: true,
    }
  );
  return updateStudent;
};

const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();

  await StudentModel.isStudentExist(id);
  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new ApiError(httpStatus.NOT_FOUND, "Failed to delete student");
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id: deletedStudent.id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete student");
  }
};

export const StudentService = {
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
