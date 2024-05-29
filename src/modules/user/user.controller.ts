import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import userValidationSchema from "./user.validation";
import sendResponse from "../../utils/sendResponse.util";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const UserController = { createStudent };
