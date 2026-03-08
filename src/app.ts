import express, { Request, Response } from "express";

import scheduleRouter from "./routes/ScheduleRoutes.js";
import InvoiceRouter from "./routes/InvoiceRouters.js";
export const app = express();

app.use(express.json());

app.use("/schedule", scheduleRouter);
app.use("/invoice", InvoiceRouter);
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running!" });
});
