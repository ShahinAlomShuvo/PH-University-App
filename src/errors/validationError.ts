import mongoose from "mongoose";
import {
  TErrorSource,
  TGenericErrorResponse,
} from "../interface/errors.interface";
import httpStatus from "http-status";

const validationError = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const status = httpStatus.BAD_REQUEST;
  const message = "Validation error";
  const errorSource: TErrorSource = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    }
  );

  return { status, message, errorSource };
};

export default validationError;
