import { Router } from "express";

import { SettingsController } from "./settings.controller";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { updateStoreValidator } from "./settings.validator";

const router = Router();

const controller = new SettingsController();

router.use(authMiddleware);

router.get("/", controller.getStore);

router.patch("/", updateStoreValidator, validate, controller.updateStore);

router.delete("/", controller.deleteStore);

export default router;
