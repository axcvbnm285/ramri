import { Router } from "express";

import { CategoryController } from "./category.controller";

import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

const controller =
  new CategoryController();

router.use(authMiddleware);

router.post("/", controller.create);

router.get("/", controller.getAll);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;