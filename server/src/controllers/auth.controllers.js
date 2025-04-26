import UserModel from "../models/user.model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcrypt";
import { NODE_ENV } from "../config/env.js";

// CREATE USER: /api/auth/sign-up
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log(role);

  const isUserExisting = await UserModel.findOne({ email });
  if (isUserExisting)
    return res.json({
      success: false,
      message: "User Already Exist",
      statusCode: 400,
    });

  const hashedPassword = await bcrypt.hash(password, 10);
  let user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  await user.save();

  const token = user.generateToken();
  res.cookie("token", token, {
    httpOnly: true,
    seccure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  const { password: pass, ...rest } = user._doc;
  return res
    .status(201)
    .json({
      success: true,
      message: `${role ? role : "User"} Created successfully`,
      token,
      user: rest,
    });
});

// LOGIN USER: /api/auth/sign-in
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({
        success: false,
        message: "Invalid Email or Password",
        statusCode: 400,
      });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res
      .status(404)
      .json({
        success: false,
        message: "Invalid Email or Password",
        statusCode: 400,
      });

  const token = user.generateToken();
  res.cookie("token", token, {
    httpOnly: true,
    seccure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  const { password: pass, ...rest } = user._doc;
  return res
    .status(201)
    .json({
      success: true,
      message: `${user.name} Login successfully`,
      token,
      user: rest,
    });
});
