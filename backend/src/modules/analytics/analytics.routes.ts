import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();
const controller = new AnalyticsController();

router.use(authMiddleware);

router.get("/overview", controller.getOverview);
router.get("/daily-orders", controller.getDailyOrders);

export { router as analyticsRoutes };
