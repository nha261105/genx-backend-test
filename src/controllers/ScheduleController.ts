import { Request, Response } from "express";
import { scheduleSchema } from "../validations/ScheduleValidator.js";
import { generateSchedule } from "../services/ScheduleService.js";

export function generateScheduleController(req: Request, res: Response) {
  const input = scheduleSchema.safeParse(req.body);

  if (!input.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input",
        details: input.error.issues.map((issue) => ({
          field: issue.path[0],
          reason: issue.message,
        })),
      },
    });
  }

  try {
    const schedule = generateSchedule(
      input.data.startDate,
      input.data.totalClasses,
      input.data.classWeekdays,
      input.data.holidays,
      input.data.holidayRanges,
    );

    return res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
}
