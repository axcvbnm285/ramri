import { Router } from "express";
import { ProductController } from "./product.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();
const controller = new ProductController();

router.use(authMiddleware);

// Get all products for logged-in owner's store
router.get("/", controller.getAll);

// Create product
router.post("/", controller.create);

router.get("/:id", controller.getById);

router.patch("/:id", controller.update);

export { router as productRoutes };