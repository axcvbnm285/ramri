import { Response } from "express";
import { AnalyticsService } from "./analytics.service";
import { success, failure } from "@/utils/response";
import { AuthRequest } from "@/middlewares/auth.middleware";

export class AnalyticsController {
  private service = new AnalyticsService();

  getOverview = async (req: AuthRequest, res: Response) => {
    try {
      const overview = await this.service.getOverview(req.user!.storeId);
      return success(res, "Overview fetched successfully.", overview);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getDailyOrders = async (req: AuthRequest, res: Response) => {
    try {
      const days = req.query.days ? Number(req.query.days) : 30;
      const data = await this.service.getDailyOrders(req.user!.storeId, days);
      return success(res, "Daily orders fetched successfully.", data);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };
}
