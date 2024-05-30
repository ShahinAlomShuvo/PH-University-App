import {
  TAcademicSemester,
  TNameCodeMapper,
} from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemester = async (
  academicSemesterData: TAcademicSemester
) => {
  const nameCodeMapper: TNameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };

  if (nameCodeMapper[academicSemesterData.name] !== academicSemesterData.code) {
    throw new Error("Invalid academic semester code");
  }

  const academicSemester = await AcademicSemesterModel.create(
    academicSemesterData
  );
  return academicSemester;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
};
