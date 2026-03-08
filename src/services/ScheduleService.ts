import dayjs from "dayjs";
import {
  isValidDate,
  isHoliday,
  isInHolidayRange,
} from "../utils/dateHelper.js";

export function generateSchedule(
  startDate: string,
  totalClasses: number,
  classWeekdays: number[],
  holiday: string[],
  holidayRanges: [string, string][],
) {
  if (!isValidDate(startDate)) {
    throw new Error("Invalid startDate format");
  }

  const normalize = [...new Set(classWeekdays)].sort((a, b) => a - b);

  let currentDay = dayjs(startDate);

  let endDate = "";
  let count = 0;
  let fullSchedule: string[] = [];

  while (count < totalClasses) {
    const currentDateStr = currentDay.format("YYYY-MM-DD");

    let currentWeekday = currentDay.day() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
    currentWeekday = (currentWeekday === 0 ? 6 : currentWeekday - 1) as
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6;

    const isValidDay =
      normalize.includes(currentWeekday) &&
      !isHoliday(currentDateStr, holiday) &&
      !isInHolidayRange(currentDateStr, holidayRanges);

    if (isValidDay) {
      fullSchedule.push(currentDateStr);
      count++;
      endDate = currentDateStr;
    }

    currentDay = currentDay.add(1, "day");
  }

  return { endDate, fullSchedule };
}
