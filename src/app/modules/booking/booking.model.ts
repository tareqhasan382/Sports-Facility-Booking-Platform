import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";
import { time } from "console";

const bookingSchema = new Schema<IBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: "Facilitys",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    payableAmount: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "unconfirmed",
    },
  },
  { timestamps: true }
);

export const BookingModel = model<IBooking>("Booking", bookingSchema);
