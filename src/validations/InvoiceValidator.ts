import z from "zod"

export const InvoiceSchema = z.object({
    courseType: z.enum(["MONTHLY", "FULL_COURSE"]),
    basePrice: z.number().min(0),
    months: z.number().min(1).max(3),
    promoCode: z.enum(["SAVE10", "FLAT50K"]).nullable(),
    canceledClasses: z.number().min(0),
    refundPerClass: z.number().min(0),
})