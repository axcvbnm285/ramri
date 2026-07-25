import { Router } from "express";

import { PlatformAdminController } from "./platform-admin.controller";

import { platformAdminAuth } from "@/middlewares/platformAdminAuth.middleware";

const router = Router();

const controller = new PlatformAdminController();

router.post("/login", controller.login);
router.post("/logout", controller.logout);

router.use(platformAdminAuth);

router.get("/me", controller.me);
router.get("/stores", controller.allStores);
router.get("/stores/pending", controller.pendingStores);
router.post("/stores/:id/approve", controller.approveStore);
router.post("/stores/:id/reject", controller.rejectStore);
router.post("/stores/:id/delete", controller.deleteStore);
router.post("/stores/:id/reactivate", controller.reactivateStore);
router.get("/stats", controller.stats);

export default router;
