import { Router } from "express";

import upload from "./multer";

import { UploadController } from "./upload.controller";

import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

const controller = new UploadController();

router.use(authMiddleware);

router.post(
  "/images",
  upload.array("images", 10),
  controller.uploadImages
);

export default router;