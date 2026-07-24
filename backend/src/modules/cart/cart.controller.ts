import { Response } from "express";

import { CartService } from "./cart.service";

import { success, failure } from "@/utils/response";
import { CustomerAuthRequest } from "@/middlewares/customerAuth.middleware";

export class CartController {
  private service = new CartService();

  getCart = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const items = await this.service.getCart(req.customer!.id);
      return success(res, "Cart fetched successfully.", items);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  addItem = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const item = await this.service.addItem(req.customer!.id, req.body);
      return success(res, "Item added to cart.", item, 201);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  updateItem = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const item = await this.service.updateItem(
        req.customer!.id,
        req.params.variantId as string,
        req.body.quantity
      );
      return success(res, "Cart updated.", item);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  removeItem = async (req: CustomerAuthRequest, res: Response) => {
    try {
      await this.service.removeItem(req.customer!.id, req.params.variantId as string);
      return success(res, "Item removed from cart.");
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  clearCart = async (req: CustomerAuthRequest, res: Response) => {
    try {
      await this.service.clearCart(req.customer!.id);
      return success(res, "Cart cleared.");
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };
}
