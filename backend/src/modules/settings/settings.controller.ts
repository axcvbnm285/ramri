import { Response } from "express";

import { SettingsService } from "./settings.service";

import { success, failure } from "@/utils/response";
import { AuthRequest } from "@/middlewares/auth.middleware";

export class SettingsController {
  private service = new SettingsService();

  getStore = async (req: AuthRequest, res: Response) => {
    try {
      const store = await this.service.getStore(req.user!.storeId);
      return success(res, "Store fetched successfully.", store);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  updateStore = async (req: AuthRequest, res: Response) => {
    try {
      const store = await this.service.updateStore(req.user!.storeId, req.body);
      return success(res, "Store updated successfully.", store);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  deleteStore = async (req: AuthRequest, res: Response) => {
    try {
      await this.service.deactivateStore(req.user!.storeId);
      res.clearCookie("token");
      return success(res, "Store deactivated successfully.");
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };
}
