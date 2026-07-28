import { Router } from "express";
import { CustomerController } from "./customer.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { customerAuthMiddleware } from "@/middlewares/customerAuth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  signupValidator,
  loginValidator,
  addressValidator,
  checkPhoneValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from "./customer.validator";

const router = Router();
const controller = new CustomerController();

// Customer self-service (storefront)
router.post("/check-phone", checkPhoneValidator, validate, controller.checkPhone);
router.post("/signup", signupValidator, validate, controller.signup);
router.post("/login", loginValidator, validate, controller.login);
router.post("/logout", customerAuthMiddleware, controller.logout);
router.get("/me", customerAuthMiddleware, controller.me);

router.get("/addresses", customerAuthMiddleware, controller.listAddresses);
router.post(
  "/addresses",
  customerAuthMiddleware,
  addressValidator,
  validate,
  controller.addAddress
);
router.patch("/addresses/:id", customerAuthMiddleware, controller.updateAddress);
router.delete("/addresses/:id", customerAuthMiddleware, controller.deleteAddress);

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  controller.forgotPassword
);
router.post("/reset-password", resetPasswordValidator, validate, controller.resetPassword);
router.patch(
  "/change-password",
  customerAuthMiddleware,
  changePasswordValidator,
  validate,
  controller.changePassword
);

// Admin views of customers
router.get("/", authMiddleware, controller.getAll);
router.get("/:id", authMiddleware, controller.getById);

export { router as customerRoutes };
