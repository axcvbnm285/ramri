import { Router } from "express";
import { CustomerController } from "./customer.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { customerAuthMiddleware } from "@/middlewares/customerAuth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { signupValidator, loginValidator, addressValidator } from "./customer.validator";

const router = Router();
const controller = new CustomerController();

// Customer self-service (storefront)
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

// Admin views of customers
router.get("/", authMiddleware, controller.getAll);
router.get("/:id", authMiddleware, controller.getById);

export { router as customerRoutes };
