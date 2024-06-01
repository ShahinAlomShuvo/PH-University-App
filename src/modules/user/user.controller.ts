import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse.util";
import httpStatus from "http-status";
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync.utils";
import { TRole } from "./user.interface";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { dateOfBirth, password, ...rest } = req.body;
  const date = new Date(dateOfBirth);
  // const validateData = studentValidationSchema.parse({
  //   ...rest,
  //   dateOfBirth: date,
  // });
  const student = await UserService.createStudent(
    {
      ...rest,
      dateOfBirth: date,
    },
    password
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

export const UserController = { createStudent };
