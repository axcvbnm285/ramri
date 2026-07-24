import { Response } from "express";
import { OrderService } from "./order.service";
import { success, failure } from "@/utils/response";
import { AuthRequest } from "@/middlewares/auth.middleware";
import { CustomerAuthRequest } from "@/middlewares/customerAuth.middleware";

export class OrderController {
  private service = new OrderService();

  // Customer-facing
  placeOrder = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const orders = await this.service.placeOrder(req.customer!.id, req.body);
      return success(res, "Order placed successfully.", orders, 201);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getMine = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const orders = await this.service.getMine(req.customer!.id);
      return success(res, "Orders fetched successfully.", orders);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getMineDetail = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const order = await this.service.getMineDetail(
        req.params.id as string,
        req.customer!.id
      );
      return success(res, "Order fetched successfully.", order);
    } catch (error) {
      return failure(res, (error as Error).message, 404);
    }
  };

  markReceivedByCustomer = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const order = await this.service.markReceivedByCustomer(
        req.params.id as string,
        req.customer!.id
      );
      return success(res, "Order marked as received.", order);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  // Admin-facing
  getAll = async (req: AuthRequest, res: Response) => {
    try {
      const orders = await this.service.getAllForStore(req.user!.storeId, req.query);
      return success(res, "Orders fetched successfully.", orders);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getById = async (req: AuthRequest, res: Response) => {
    try {
      const order = await this.service.getByIdForStore(
        req.params.id as string,
        req.user!.storeId
      );
      return success(res, "Order fetched successfully.", order);
    } catch (error) {
      return failure(res, (error as Error).message, 404);
    }
  };

  updateStatus = async (req: AuthRequest, res: Response) => {
    try {
      const order = await this.service.updateStatus(
        req.params.id as string,
        req.user!.storeId,
        req.body
      );
      return success(res, "Order status updated.", order);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  cancel = async (req: AuthRequest, res: Response) => {
    try {
      const order = await this.service.cancel(req.params.id as string, req.user!.storeId);
      return success(res, "Order cancelled.", order);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  verifyPayment = async (req: AuthRequest, res: Response) => {
    try {
      const order = await this.service.verifyPayment(
        req.params.id as string,
        req.user!.storeId,
        req.body
      );
      return success(res, "Payment verification updated.", order);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  markReceivedByAdmin = async (req: AuthRequest, res: Response) => {
    try {
      const order = await this.service.markReceivedByAdmin(
        req.params.id as string,
        req.user!.storeId
      );
      return success(res, "Order marked as received.", order);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };
}
