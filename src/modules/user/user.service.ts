import config from "../../config";
import { TStudent } from "../student/student.interface";
import StudentModel from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudent = async (studentData: TStudent, password: string) => {
  //here "create" is a mongoose builtin static method
  //here i use custom static method "isStudentExist"
  //   if (await StudentModel.isStudentExist(data.id)) {
  //     throw new Error("Student already exist");
  //   }

  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";
  userData.id = "2030100001";

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

export const UserService = { createStudent };
