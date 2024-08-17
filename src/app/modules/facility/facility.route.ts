import express from "express";
import { FacilityController } from "./facility.controller";
import { authVerify } from "../../middlewares/authVerify";
import { USER_Role } from "../user/user.constants";
import validateRequest from "../../middlewares/validateRequest";
import {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
} from "./facility.validation";

const router = express.Router();

router.post(
  "/facility",
  authVerify(USER_Role.ADMIN),
  validateRequest(createFacilityValidationSchema),
  FacilityController.createFacility
);
router.put(
  "/facility/:id",
  authVerify(USER_Role.ADMIN),
  validateRequest(updateFacilityValidationSchema),
  FacilityController.updateFacility
);
router.delete(
  "/facility/:id",
  authVerify(USER_Role.ADMIN),
  FacilityController.deleteFacility
);

router.get("/facility", FacilityController.Facilities);
export const FacilityRoute = router;
