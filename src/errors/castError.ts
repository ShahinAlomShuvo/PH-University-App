import mongoose from "mongoose";
import {
  TErrorSource,
  TGenericErrorResponse,
} from "../interface/errors.interface";
import httpStatus from "http-status";

const handleCastError = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  const status = httpStatus.BAD_REQUEST;
  const message = "Invalid ID";
  const errorSource: TErrorSource = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return { status, message, errorSource };
};

export default handleCastError;
