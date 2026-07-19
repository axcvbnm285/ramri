import { Router } from "express";
import { InventoryController } from "./inventory.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();
const controller = new InventoryController();

router.use(authMiddleware);

router.get("/logs", controller.getLogs);
router.get("/low-stock", controller.getLowStock);
router.patch("/variants/:variantId/stock", controller.adjustStock);

export { router as inventoryRoutes };
