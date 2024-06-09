import { Schema } from "mongoose";
import { TUserName } from "./common.interface";

export const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: true, maxlength: 10 },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
  },
  { _id: false }
);
