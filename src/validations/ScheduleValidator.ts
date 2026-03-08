import z from "zod"

export const scheduleSchema = z.object({
   startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    totalClasses: z.number().min(1),
    classWeekdays: z.array(z.number().min(0).max(6)),
    holidays: z.array(z.string()),
    holidayRanges: z.array(z.tuple([z.string(),z.string()]))
})

