import { TAcademicFaculty } from "./academic-faculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFaculties = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getAcademicFacultyById = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFacultyById,
  updateAcademicFaculty,
};
