import express from "express";
import { authVerify } from "../../middlewares/authVerify";
import { USER_Role } from "../user/user.constants";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingValidationSchema } from "./booking.validation";

const router = express.Router();

router.post(
  "/bookings",
  authVerify(USER_Role.USER),
  validateRequest(createBookingValidationSchema),
  BookingController.createBooking
);
router.get(
  "/bookings",
  authVerify(USER_Role.ADMIN),
  BookingController.bookings
);
router.get(
  "/bookings/:id",
  authVerify(USER_Role.USER),
  BookingController.userByBooking
);
router.delete(
  "/bookings/:id",
  authVerify(USER_Role.USER),
  BookingController.cancelBooking
);
router.get("/check-availability", BookingController.checkTheAvailability);

export const BookingRoute = router;
