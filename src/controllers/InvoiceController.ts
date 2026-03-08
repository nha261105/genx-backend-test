import { Request, Response } from "express";

import { InvoiceSchema } from "../validations/InvoiceValidator.js";

import { calcInvoice } from "../services/invoiceService.js";


export function InvoiceController(req: Request, res: Response) {
  const input = InvoiceSchema.safeParse(req.body);

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
    const invoice = calcInvoice(
      input.data.courseType,
      input.data.basePrice,
      input.data.months,
      input.data.promoCode,
      input.data.canceledClasses,
      input.data.refundPerClass,
    );

    return res.status(200).json({
      success: true,
      data: invoice,
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
