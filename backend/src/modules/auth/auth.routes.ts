import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from "./auth.validator";

const router = Router();
const controller = new AuthController();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/me", authMiddleware, controller.me);

router.post("/logout", authMiddleware, controller.logout);

router.post("/forgot-password", forgotPasswordValidator, validate, controller.forgotPassword);
router.post("/reset-password", resetPasswordValidator, validate, controller.resetPassword);
router.patch(
  "/change-password",
  authMiddleware,
  changePasswordValidator,
  validate,
  controller.changePassword
);

export default router;