import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.util";
import { AcademicSemesterServices } from "./academicSemister.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemester(
    req.body
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester created successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
