import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config";
import { IUser } from "./user.interface";
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false }, //select: false
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    address: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const UserModel = model<IUser>("Users", userSchema);
