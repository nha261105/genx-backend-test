import { calcInvoice } from "../src/services/invoiceService.js"

describe("calcInvoice", () => {

  // Case 1: MONTHLY tính đúng subtotal
  it("should calculate correct subtotal for MONTHLY", () => {
    const result = calcInvoice("MONTHLY", 1000000, 3, null, 0, 0)
    expect(result.subtotal).toBe(3000000)
  })

  // Case 2: FULL_COURSE tính đúng subtotal
  it("should calculate correct subtotal for FULL_COURSE", () => {
    const result = calcInvoice("FULL_COURSE", 5000000, 1, null, 0, 0)
    expect(result.subtotal).toBe(5000000)
  })

  // Case 3: SAVE10 tính đúng discount + floor
  it("should calculate correct discount for SAVE10 (floor)", () => {
    // subtotal = 1500000 * 2 = 3000000
    // discount = floor(3000000 * 0.10) = 300000
    const result = calcInvoice("MONTHLY", 1500000, 2, "SAVE10", 0, 0)
    expect(result.discount).toBe(300000)
    expect(result.total).toBe(2700000)
  })

  // Case 4: FLAT50K tính đúng discount
  it("should calculate correct discount for FLAT50K", () => {
    const result = calcInvoice("MONTHLY", 1000000, 1, "FLAT50K", 0, 0)
    expect(result.discount).toBe(50000)
    expect(result.total).toBe(950000)
  })

  // Case 5: total không âm khi refund lớn (clamp)
  it("should clamp total to 0 when refund is larger than subtotal", () => {
    // subtotal = 500000, refund = 999999 → total phải là 0
    const result = calcInvoice("FULL_COURSE", 500000, 1, null, 10, 99999)
    expect(result.total).toBe(0)
  })

  // Case 6: months ngoài 1-3 → throw error
  it("should throw error when months is out of range", () => {
    expect(() =>
      calcInvoice("MONTHLY", 1000000, 5, null, 0, 0)
    ).toThrow()
  })

  // Case 7: basePrice âm → throw error
  it("should throw error when basePrice is negative", () => {
    expect(() =>
      calcInvoice("MONTHLY", -1000000, 2, null, 0, 0)
    ).toThrow()
  })

  // Case 8: promoCode không hợp lệ → throw error
  it("should throw error when promoCode is invalid", () => {
    expect(() =>
      calcInvoice("MONTHLY", 1000000, 2, "INVALID" as any, 0, 0)
    ).toThrow()
  })

})