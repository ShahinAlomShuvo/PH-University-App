import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { Role, Status } from "./user.constant";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: Role, required: true },
    status: {
      type: String,
      enum: Status,
      default: "in-progress",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds)
  );

  next();
});

userSchema.post("find", async function (docs, next) {
  docs.password = "";
  next();
});

export const UserModel = model<TUser>("User", userSchema);
