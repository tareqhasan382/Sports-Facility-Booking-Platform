import { Schema, model } from "mongoose";
import { IFacility } from "./facility.interface";

const facilitySchema = new Schema<IFacility>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
//export const BookingModel = model<IBooking>("Booking", bookingSchema);
export const FacilityModel = model<IFacility>("Facilitys", facilitySchema);
