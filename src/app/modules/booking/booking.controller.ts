import { NextFunction, Request, Response } from "express";
import { BookingModel } from "./booking.model";
import catchAsync from "../../../shared/catchAsync";

import httpStatus from "http-status";
import { FacilityModel } from "../facility/facility.model";
const checkAvailability = async (
  facility: string,
  date: string,
  startTime: string,
  endTime: string
): Promise<boolean> => {
  const bookings = await BookingModel.find({
    facility,
    date,
    $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
  });

  return bookings.length === 0;
};

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const { facility, date, startTime, endTime } = req.body;
      const isAvailable = await checkAvailability(
        facility,
        date,
        startTime,
        endTime
      );
      if (!isAvailable) {
        return res.status(httpStatus.CONFLICT).json({
          success: false,
          message: "The facility is unavailable during the requested time slot",
        });
      }
      const facilityDetails = await FacilityModel.findById(facility);

      if (!facilityDetails) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: " data not found",
        });
      }
      const payableAmount = await ((parseInt(endTime) - parseInt(startTime)) *
        facilityDetails?.pricePerHour);

      const data = {
        facility: facility,
        date: date,
        startTime: startTime,
        endTime: endTime,
        user: user?.userId,
        payableAmount: payableAmount,
        isBooked: "confirmed",
      };

      const result = await BookingModel.create(data);
      const bookingData = await BookingModel.findById(result._id)
        .lean()
        .select("-__v -createdAt -updatedAt");
      return res.status(200).json({
        status: true,
        message: "Booking created successfully!",
        date: bookingData,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
  }
);

const bookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BookingModel.find()
        .populate({
          path: "facility",
          select: "-__v -createdAt -updatedAt",
        })
        .select("-__v -createdAt -updatedAt");
      if (result.length < 1) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "Booking data not found",
          data: result.length,
        });
      } else {
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Bookings retrieved successfully",
          data: result,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
  }
);
const userByBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await BookingModel.find({ user: id })
        .populate({
          path: "facility",
          select: "-__v -createdAt -updatedAt",
        })
        .select("-__v -createdAt -updatedAt");
      if (result.length < 1) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "Booking data not found",
          data: result.length,
        });
      } else {
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Bookings retrieved successfully",
          data: result,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
  }
);
const cancelBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      const { id } = req.params;
      const Booking = await BookingModel.findOne({ _id: id, user: userId })
        .populate({
          path: "facility",
          select: "-__v -createdAt -updatedAt",
        })
        .select("-__v -createdAt -updatedAt");
      if (!Booking) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "Booking not found or you're not authorized to cancel it",
        });
      }
      Booking.isBooked = "canceled";
      await Booking.save();
      return res.status(200).json({
        status: true,
        message: "Bookings retrieved successfully",
        date: Booking,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
  }
);

const checkTheAvailability = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    const bookings = await BookingModel.find({
      date: date,
      isBooked: "confirmed",
    }).select("-_id startTime endTime");

    if (bookings.length < 1) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Booking data not found",
        data: bookings.length,
      });
    } else {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Data retrieved successfully",
        data: bookings,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occurred while checking availability",
    });
  }
};

export const BookingController = {
  createBooking,
  bookings,
  userByBooking,
  cancelBooking,
  checkTheAvailability,
};
