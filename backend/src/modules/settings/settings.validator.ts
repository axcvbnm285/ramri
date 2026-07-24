import { body } from "express-validator";

export const updateStoreValidator = [
  body("name").optional().trim().notEmpty().withMessage("Store name cannot be empty."),
  body("logo").optional().trim().isURL().withMessage("Logo must be a valid URL."),
  body("paymentQrUrl").optional().trim().isURL().withMessage("Payment QR must be a valid URL."),
  body("promoEnabled").optional().isBoolean().withMessage("promoEnabled must be true or false."),
  body("promoBadgeText").optional().trim().notEmpty().withMessage("Badge text cannot be empty."),
  body("promoTitle").optional().trim().notEmpty().withMessage("Title cannot be empty."),
  body("promoDescription")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty."),
  body("promoStartsAt").optional().isISO8601().withMessage("Invalid start date."),
  body("promoEndsAt").optional().isISO8601().withMessage("Invalid end date."),
];
