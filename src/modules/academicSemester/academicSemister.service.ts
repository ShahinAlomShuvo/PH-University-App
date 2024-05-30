import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemester = async (
  academicSemesterData: TAcademicSemester
) => {
  const academicSemester = await AcademicSemesterModel.create(
    academicSemesterData
  );
  return academicSemester;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
};
