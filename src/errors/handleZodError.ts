import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/errors.interface";

const handleZodError = (err: ZodError) => {
  const status = httpStatus.BAD_REQUEST;
  const message = "Validation error";
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return { status, message, errorSource };
};

export default handleZodError;
