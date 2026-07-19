import { Request, Response } from "express";
import { StorefrontService } from "./storefront.service";
import { success, failure } from "@/utils/response";

export class StorefrontController {
  private service = new StorefrontService();

  getCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await this.service.getCategories();
      return success(res, "Categories fetched successfully.", categories);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.service.getProducts(req.query);
      return success(res, "Products fetched successfully.", products);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getProductBySlug = async (req: Request, res: Response) => {
    try {
      const product = await this.service.getProductBySlug(req.params.slug as string);
      return success(res, "Product fetched successfully.", product);
    } catch (error) {
      return failure(res, (error as Error).message, 404);
    }
  };
}
