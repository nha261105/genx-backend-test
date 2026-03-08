export function calcInvoice(
    courseType: "MONTHLY" | "FULL_COURSE",
    basePrice: number,
    months: number,
    promoCode: "SAVE10" | "FLAT50K" | null,
    canceledClasses: number,
    refundPerClass: number
) {

    if(basePrice < 0 || refundPerClass < 0 || canceledClasses < 0) {
        throw new Error("basePrice, refundPerClass, canceledClasses must be >= 0")
    }

    if(courseType === "MONTHLY" && (months < 1 || months > 3)) {
        throw new Error("months must be between 1 and 3")
    }

    if(promoCode !== "SAVE10" && promoCode !== "FLAT50K" && promoCode !== null) {
        throw new Error("Invalid PromoCode");
    }
    const subtotal = (courseType == "MONTHLY" ? basePrice * months : basePrice);
    let discount = 0;
    if(promoCode == "SAVE10") {
        discount = Math.floor(subtotal * 0.10);
    } else if(promoCode == "FLAT50K") {
        discount = 50000;
    } else discount  = 0;

    discount = Math.min(discount,subtotal);

    let refund = canceledClasses * refundPerClass;

    const total = Math.max(0, subtotal - discount - refund);

    return {subtotal, discount, refund, total};
}