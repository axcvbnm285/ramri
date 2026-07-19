import { Router } from "express";
import { OrderController } from "./order.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { customerAuthMiddleware } from "@/middlewares/customerAuth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { placeOrderValidator, updateStatusValidator } from "./order.validator";

const router = Router();
const controller = new OrderController();

// Customer-facing
router.post("/", customerAuthMiddleware, placeOrderValidator, validate, controller.placeOrder);
router.get("/me", customerAuthMiddleware, controller.getMine);
router.get("/me/:id", customerAuthMiddleware, controller.getMineDetail);
router.patch("/me/:id/receive", customerAuthMiddleware, controller.markReceivedByCustomer);

// Admin-facing
router.get("/", authMiddleware, controller.getAll);
router.get("/:id", authMiddleware, controller.getById);
router.patch(
  "/:id/status",
  authMiddleware,
  updateStatusValidator,
  validate,
  controller.updateStatus
);
router.patch("/:id/cancel", authMiddleware, controller.cancel);
router.patch("/:id/mark-received", authMiddleware, controller.markReceivedByAdmin);

export { router as orderRoutes };
