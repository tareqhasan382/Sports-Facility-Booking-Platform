import { z } from "zod";
const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    facility: objectIdSchema,
    isBooked: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
  }),
});
// {
//   "facility": "60d9c4e4f3b4b544b8b8d1c5",
//   "date": "2024-06-15",
//   "startTime": "10:00",
//   "endTime": "13:00"
// }
