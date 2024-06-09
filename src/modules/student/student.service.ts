import httpStatus from "http-status";
import { TStudent } from "./student.interface";
import StudentModel from "./student.model";
import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import { ApiError } from "../../errors/apiError.utils";
import { QueryInterface } from "../../interface/query.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

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

// const getAllStudents = async (query: QueryInterface) => {
//   let filter = {};
//   const sort = query.sort ? query.sort : "-createdAt";
//   const limit = query.limit ? Number(query.limit) : 10;
//   const skip = query.skip ? Number(query.skip) : 0;
//   if (query?.searchTerm) {
//     const searchTerm = query.searchTerm as string;

//     filter = {
//       $or: [
//         "name.firstName",
//         "name.middleName",
//         "name.lastName",
//         "presentAddress",
//         "permanentAddress",
//       ].map((field) => ({ [field]: new RegExp(searchTerm, "i") })),
//     };
//   }

//   if (query.filter) {
//     const fieldsFilter = JSON.parse(query.filter as string);
//     filter = {
//       ...filter,
//       ...fieldsFilter,
//     };
//   }

//   let fields = "-__v";
//   if (query.fields) {
//     fields = (query.fields as string).split(",").join(" ");
//   }

//   const students = await StudentModel.find(filter)
//     .select(fields)
//     .populate("admissionSemester")
//     .populate({
//       path: "academicDepartment",
//       populate: {
//         path: "academicFaculty",
//       },
//     })
//     .populate("user")
//     .limit(limit)
//     .skip(skip)
//     .sort(sort as string);
//   return students;
// };

// const getAllStudents = async (query: Record<string, unknown>) => {
//   const queryObj = { ...query };
//   let searchTerm = "";
//   if (query.searchTerm) {
//     searchTerm = query.searchTerm as string;
//   }

//   const studentSearchableFields = [
//     "name.firstName",
//     "name.middleName",
//     "name.lastName",
//     "presentAddress",
//     "permanentAddress",
//   ];

//   const search = {
//     $or: studentSearchableFields.map((field) => ({
//       [field]: new RegExp(searchTerm, "i"),
//     })),
//   };

//   const excludeFields = [
//     "searchTerm",
//     "sort",
//     "limit",
//     "skip",
//     "page",
//     "fields",
//   ];
//   excludeFields.forEach((field) => delete queryObj[field]);

//   const searchQuery = StudentModel.find(search);

//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate("admissionSemester")
//     .populate({
//       path: "academicDepartment",
//       populate: {
//         path: "academicFaculty",
//       },
//     })
//     .populate("user");

//   let sort = "-createdAt";
//   if (query.sort) {
//     sort = query.sort as string;
//   }

//   const sortQuery = filterQuery.sort(sort);

//   let limit = 10;

//   if (query.limit) {
//     limit = Number(query.limit);
//   }

//   let page = 1;
//   let skip = 0;

//   if (query.page) {
//     page = Number(query.page);
//     skip = (page - 1) * limit;
//   }

//   const paginateQuery = sortQuery.skip(skip);
//   const limitQuery = paginateQuery.limit(limit);

//   let fields = "-__v";
//   if (query.fields) {
//     fields = (query.fields as string).split(",").join(" ");
//   }

//   const fieldsQuery = await limitQuery.select(fields);

//   return fieldsQuery;
// };

const getAllStudents = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      })
      .populate("user"),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .getQuery();

  const students = await studentQuery;
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
