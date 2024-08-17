import express, { Application } from "express";
const app: Application = express();
import cors from "cors";

import cookieParser from "cookie-parser";
import { FacilityRoute } from "./app/modules/facility/facility.route";
import { BookingRoute } from "./app/modules/booking/booking.route";
import { UserRoute } from "./app/modules/user/user.route";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const corsOptions = {
  origin: ["http://localhost:5173/"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Applications route
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: " Our server is Running 🚀" });
});
app.use("/api/auth", UserRoute);
app.use("/api", FacilityRoute);
app.use("/api", BookingRoute);

app.use(globalErrorHandler);
// route not found
app.use(notFound);

export default app;
