import { Model, Types } from "mongoose";
import { TBloodGroup, TGender, TUserName } from "../../common/common.interface";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  user: Types.ObjectId | string;
  gender: TGender;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

// for create static

export interface TStudentModel extends Model<TStudent> {
  isStudentExist(id: string): Promise<TStudent | null>;
}

// for creating instance

// export type StudentMethods = {
//   isStudentExist(id: string): Promise<TStudent | null>;
// };

// export type TStudentModel = Model<TStudent, {}, StudentMethods>;
