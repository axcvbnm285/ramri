import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();
const controller = new AuthController();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/me", authMiddleware, controller.me);

router.post("/logout", authMiddleware, controller.logout);

export default router;