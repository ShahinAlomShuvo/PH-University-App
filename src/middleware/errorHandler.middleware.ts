import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/errors.interface";
import config from "../config";
import handleZodError from "../errors/handleZodError";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    status = simplifiedError?.status;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }

  return res.status(status).json({
    success: false,
    message,
    errorSource,
    err,
    stack: config.env === "development" ? err.stack : null,
  });
};

export default errorHandler;
