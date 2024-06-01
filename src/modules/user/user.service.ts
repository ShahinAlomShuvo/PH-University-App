import config from "../../config";
import { TStudent } from "../student/student.interface";
import StudentModel from "../student/student.model";
import { TRole, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";

const createStudent = async (studentData: TStudent, password: string) => {
  //here "create" is a mongoose builtin static method
  //here i use custom static method "isStudentExist"
  //   if (await StudentModel.isStudentExist(data.id)) {
  //     throw new Error("Student already exist");
  //   }

  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";

  const admissionSemester = await AcademicSemesterModel.findOne({
    _id: studentData.admissionSemester,
  });

  const studentId = await findLatestStudent(userData.role);

  userData.id = await generateStudentId(admissionSemester, studentId);

  const user = await UserModel.create(userData);

  if (Object.keys(user).length) {
    studentData.id = user.id;
    studentData.user = user._id;
    const student = await StudentModel.create(studentData);
    return student;
  }

  // here "save" is a mongoose builtin instance method
  // here i use custom instance method "isStudentExist"

  // const student = new StudentModel(data);
  // if (await student.isStudentExist(data.id)) {
  //   throw new Error("Student already exist");
  // }
  // await student.save();
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

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const UserService = { createStudent, findLatestStudent };
