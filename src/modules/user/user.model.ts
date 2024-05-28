import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  id: { type: String, required: true },
  password: { type: String, required: true },
  needPasswordChange: { type: Boolean, default: true },
  role: { type: String, enum: ["admin", "faculty", "student"], required: true },
  status: {
    type: String,
    enum: ["in-progress", "blocked"],
    default: "in-progress",
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
});

export const UserModel = model<TUser>("User", userSchema);
