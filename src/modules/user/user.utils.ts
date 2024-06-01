import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generateStudentId = async (
  payload: TAcademicSemester | null,
  studentId: string | undefined
) => {
  let currentId = (0).toString().padStart(4, "0");
  const currentSemesterCode = studentId?.substring(4, 6);
  const currentYear = studentId?.substring(0, 4);

  if (
    studentId &&
    payload?.year === currentYear &&
    payload?.code === currentSemesterCode
  ) {
    currentId = studentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${payload?.year}${payload?.code}${incrementId}`;
  return incrementId;
};
