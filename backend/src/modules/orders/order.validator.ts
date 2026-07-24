import { body } from "express-validator";

export const placeOrderValidator = [
  body("addressId").notEmpty().withMessage("Delivery address is required."),
  body("items").isArray({ min: 1 }).withMessage("Your cart is empty."),
  body("items.*.variantId").notEmpty().withMessage("Invalid cart item."),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),
];

export const updateStatusValidator = [
  body("status")
    .isIn(["CONFIRMED", "DISPATCHED"])
    .withMessage("Invalid status transition."),
];

export const verifyPaymentValidator = [
  body("approved").isBoolean().withMessage("approved must be true or false."),
];
