import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";
  return res.status(status).send({
    success: false,
    message,
    error: err.errors || err,
  });
};

export default errorHandler;
