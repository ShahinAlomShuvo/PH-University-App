import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generateStudentId = async (
  payload: TAcademicSemester | null,
  studentId: string | undefined
) => {
  console.log(studentId);
  const currentId = studentId || (0).toString().padStart(4, "0");
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${payload?.year}${payload?.code}${incrementId}`;
  return incrementId;
};
