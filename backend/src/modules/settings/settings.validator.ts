import { body } from "express-validator";

export const updateStoreValidator = [
  body("name").optional().trim().notEmpty().withMessage("Store name cannot be empty."),
  body("logo").optional().trim().isURL().withMessage("Logo must be a valid URL."),
];
