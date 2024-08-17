import express from "express";
import { UserController } from "./user.controller";
import {
  createUserValidationSchema,
  loginUserValidationSchema,
} from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(createUserValidationSchema),
  UserController.createUser
);
router.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  UserController.loginUser
);

export const UserRoute = router;
