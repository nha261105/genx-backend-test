import { generateSchedule } from "../src/services/ScheduleService.js"

describe("generateSchedule", () => {

  // Case 1: Happy path
  it("generate correct number of classes", () => {
    const result = generateSchedule("2026-01-01", 5, [1, 3], [], [])
    expect(result.fullSchedule).toHaveLength(5)
  })

  // Case 2: Bỏ qua holidays
  it("skip holidays", () => {
    const result = generateSchedule("2026-01-05", 3, [0], ["2026-01-05"], [])
    // 2026-01-05 là Thứ 2 nhưng là holiday → skip
    expect(result.fullSchedule).not.toContain("2026-01-05")
    expect(result.fullSchedule).toHaveLength(3)
  })

  // Case 3: Bỏ qua holidayRanges
  it("skip holidayRanges", () => {
    const result = generateSchedule("2026-01-01", 3, [1, 3], [], [["2026-01-06", "2026-01-08"]])
    expect(result.fullSchedule).not.toContain("2026-01-06")
    expect(result.fullSchedule).not.toContain("2026-01-08")
  })

  // Case 4: classWeekdays có duplicate
  it("handle duplicate classWeekdays", () => {
    const result = generateSchedule("2026-01-01", 3, [1, 1, 3], [], [])
    expect(result.fullSchedule).toHaveLength(3)
  })

  // Case 5: classWeekdays không sort
  it("should handle unsorted classWeekdays", () => {
    const result = generateSchedule("2026-01-01", 3, [3, 1], [], [])
    expect(result.fullSchedule).toHaveLength(3)
  })

  // Case 6: startDate sai format → throw error
  it("should throw error on invalid date format", () => {
    expect(() =>
      generateSchedule("01-01-2026", 3, [1], [], [])
    ).toThrow()
  })

})