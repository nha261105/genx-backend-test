import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";


dayjs.extend(customParseFormat);

/**
 * Hàm dùng thư viện dayjs để kiểm tra ngày học truyền vào có đúng format YYYY--MM-DD hay không ?
 * @param date 
 * @returns boolean
 */
export function isValidDate(date: string): boolean {
  return dayjs(date, "YYYY-MM-DD", true).isValid();
}

/**
 * Hàm kiểm tra cái ngày học có nằm trong trong danh sách ngày nghỉ hay không ?
 * @param date 
 * @param holidays (string[])
 * @returns boolean
 */
export function isHoliday(date: string,holidays: string[]): boolean {
  return holidays.includes(date);
}

/**
 * Hàm kiểm tra xem ngày học có nằm trong bất kì phạm vi ngày nghỉ từ startDate -> EndDate hay không ?
 * @param date 
 * @param ranges ([startDate,endDate])
 * @returns boolean
 */
export function isInHolidayRange(
  date: string,
  ranges: [string, string][],
): boolean {
  return ranges.some(
    ([startDate, endDate]) => (date >= startDate && date <= endDate),
  );
}
