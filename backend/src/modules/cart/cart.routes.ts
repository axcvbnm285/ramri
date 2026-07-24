import { Router } from "express";

import { CartController } from "./cart.controller";

import { customerAuthMiddleware } from "@/middlewares/customerAuth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { addCartItemValidator, updateCartItemValidator } from "./cart.validator";

const router = Router();

const controller = new CartController();

router.use(customerAuthMiddleware);

router.get("/", controller.getCart);

router.post("/", addCartItemValidator, validate, controller.addItem);

router.patch("/:variantId", updateCartItemValidator, validate, controller.updateItem);

router.delete("/:variantId", controller.removeItem);

router.delete("/", controller.clearCart);

export default router;
