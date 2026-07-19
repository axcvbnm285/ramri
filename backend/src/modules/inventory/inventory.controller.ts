import { Response } from "express";
import { InventoryService } from "./inventory.service";
import { success, failure } from "@/utils/response";
import { AuthRequest } from "@/middlewares/auth.middleware";

export class InventoryController {
  private service = new InventoryService();

  getLogs = async (req: AuthRequest, res: Response) => {
    try {
      const logs = await this.service.getLogs(req.user!.storeId, req.query);
      return success(res, "Inventory logs fetched successfully.", logs);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getLowStock = async (req: AuthRequest, res: Response) => {
    try {
      const threshold = req.query.threshold ? Number(req.query.threshold) : 5;
      const variants = await this.service.getLowStock(req.user!.storeId, threshold);
      return success(res, "Low stock variants fetched successfully.", variants);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  adjustStock = async (req: AuthRequest, res: Response) => {
    try {
      const log = await this.service.adjustStock(
        req.params.variantId as string,
        req.user!.storeId,
        req.body
      );
      return success(res, "Stock adjusted successfully.", log);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };
}
