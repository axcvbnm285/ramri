import { body } from "express-validator";

export const forgotPasswordValidator = [
  body("email").trim().isEmail().withMessage("Enter a valid email."),
];

export const resetPasswordValidator = [
  body("token").trim().notEmpty().withMessage("Reset token is required."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

export const changePasswordValidator = [
  body("currentPassword").notEmpty().withMessage("Current password is required."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];
