import { body } from "express-validator";

export const addCartItemValidator = [
  body("variantId").trim().notEmpty().withMessage("variantId is required."),
  body("quantity").isInt({ min: 1 }).withMessage("quantity must be at least 1."),
];

export const updateCartItemValidator = [
  body("quantity").isInt().withMessage("quantity must be an integer."),
];
