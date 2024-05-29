import { Request, Response } from "express";
import { UserService } from "./user.service";
import userValidationSchema from "./user.validation";

const createStudent = async (req: Request, res: Response) => {
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
    return res.status(200).send({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const UserController = { createStudent };
