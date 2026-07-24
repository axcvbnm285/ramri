import { Router } from "express";

import upload from "./multer";

import { UploadController } from "./upload.controller";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { customerAuthMiddleware } from "@/middlewares/customerAuth.middleware";

const router = Router();

const controller = new UploadController();

router.post(
  "/images",
  authMiddleware,
  upload.array("images", 10),
  controller.uploadImages
);

// Payment-proof screenshots are uploaded by a logged-in customer at
// checkout, not a store admin, so this route needs the customer JWT
// cookie/middleware instead of the store-admin one used above.
router.post(
  "/payment-proof",
  customerAuthMiddleware,
  upload.single("proof"),
  controller.uploadPaymentProof
);

export default router;