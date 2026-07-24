import { Request, Response } from "express";

import { success, failure } from "@/utils/response";
import { UploadService } from "./upload.service";

export class UploadController {
  private service = new UploadService();

  uploadImages = async (
    req: Request,
    res: Response
  ) => {
    try {
      const files =
        req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return failure(
          res,
          "No images provided.",
          400
        );
      }

      const uploads = await Promise.all(
        files.map((file) =>
          this.service.upload(file)
        )
      );

      return success(
        res,
        "Images uploaded successfully.",
        uploads
      );
    } catch (error) {
      console.error("Image upload error:", error);

      return failure(
        res,
        (error as Error).message,
        400
      );
    }
  };

  uploadPaymentProof = async (req: Request, res: Response) => {
    try {
      const file = req.file as Express.Multer.File | undefined;

      if (!file) {
        return failure(res, "No proof image provided.", 400);
      }

      const uploaded = await this.service.upload(file, "ramri/payment-proofs");

      return success(res, "Payment proof uploaded successfully.", uploaded);
    } catch (error) {
      console.error("Payment proof upload error:", error);

      return failure(res, (error as Error).message, 400);
    }
  };
}