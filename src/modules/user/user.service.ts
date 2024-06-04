import config from "../../config";
import { TStudent } from "../student/student.interface";
import StudentModel from "../student/student.model";
import { TRole, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";
import { ApiError } from "../../utils/apiError.utils";
import httpStatus from "http-status";

const createStudent = async (studentData: TStudent, password: string) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";

  const admissionSemester = await AcademicSemesterModel.findOne({
    _id: studentData.admissionSemester,
  });

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const studentId = await findLatestStudent(userData.role);

    userData.id = await generateStudentId(admissionSemester, studentId);

    const user = await UserModel.create([userData], { session });

    if (!user.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    studentData.id = user[0].id;
    studentData.user = user[0]._id;
    const student = await StudentModel.create([studentData], { session });

    if (!student.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    session.endSession();
    return student;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
  }
};

const findLatestStudent = async (role: string) => {
  const lastStudent = await UserModel.findOne(
    { role },
    {
      _id: 0,
      id: 1,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const UserService = { createStudent };
