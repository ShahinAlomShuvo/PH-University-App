import httpStatus from "http-status";
import { TErrorSource } from "../interface/errors.interface";

const handleDuplicateKey = (error: any) => {
  const status = httpStatus.BAD_REQUEST;
  const message = "Duplicate key error";

  const pattern = /\"([^\"]+)\"/;
  const match = error.message.match(pattern);

  const errorSource: TErrorSource = [
    {
      path: "",
      message: `${match[1]} already exists`,
    },
  ];
  return { status, message, errorSource };
};
export default handleDuplicateKey;
