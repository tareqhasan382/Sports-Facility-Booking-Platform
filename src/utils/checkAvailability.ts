import { BookingModel } from "src/app/modules/booking/booking.model";

export const checkAvailability = async (
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
