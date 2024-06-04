import { TAcademicDepartment } from "./academic-department.interface";
import { AcademicDepartmentModel } from "./academic-department.model";

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartments = async () => {
  const result = await AcademicDepartmentModel.find().populate(
    "academicFaculty"
  );
  return result;
};

const getAcademicDepartmentById = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id).populate(
    "academicFaculty"
  );
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getAcademicDepartmentById,
  updateAcademicDepartment,
};
