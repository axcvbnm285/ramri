import { body } from "express-validator";

export const signupValidator = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("phone")
    .trim()
    .matches(/^9[678]\d{8}$/)
    .withMessage("Enter a valid 10-digit phone number."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  body("email").optional({ values: "falsy" }).isEmail().withMessage("Enter a valid email."),
];

export const checkPhoneValidator = [
  body("phone")
    .trim()
    .matches(/^9[678]\d{8}$/)
    .withMessage("Enter a valid 10-digit phone number."),
];

export const loginValidator = [
  body("phone").trim().notEmpty().withMessage("Phone number is required."),
  body("password").notEmpty().withMessage("Password is required."),
];

export const addressValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required."),
  body("phone")
    .trim()
    .matches(/^9[678]\d{8}$/)
    .withMessage("Enter a valid 10-digit phone number."),
  body("line1").trim().notEmpty().withMessage("Address line 1 is required."),
  body("city").trim().notEmpty().withMessage("City is required."),
  body("state").trim().notEmpty().withMessage("State is required."),
  body("pincode")
    .trim()
    .matches(/^\d{5}$/)
    .withMessage("Enter a valid 5-digit postal code."),
];
