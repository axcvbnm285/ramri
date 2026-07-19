import { Response } from "express";

import { CategoryService } from "./category.service";

import { success, failure } from "@/utils/response";
import { AuthRequest } from "@/middlewares/auth.middleware";

export class CategoryController {
  private service = new CategoryService();

  create = async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const category =
        await this.service.create(
          req.body,
          req.user!.storeId
        );

      return success(
        res,
        "Category created successfully.",
        category,
        201
      );
    } catch (error) {
      return failure(
        res,
        (error as Error).message
      );
    }
  };

  getAll = async (
    req: AuthRequest,
    res: Response
  ) => {
    const categories =
      await this.service.getAll(
        req.user!.storeId
      );

    return success(
      res,
      "Categories fetched successfully.",
      categories
    );
  };

  update = async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const category = await this.service.update(
        req.params.id as string,
        req.user!.storeId,
        req.body
      );

      return success(
        res,
        "Category updated successfully.",
        category
      );
    } catch (error) {
      return failure(
        res,
        (error as Error).message
      );
    }
  };

  delete = async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      await this.service.delete(req.params.id as string, req.user!.storeId);

      return success(
        res,
        "Category deleted successfully."
      );
    } catch (error) {
      return failure(
        res,
        (error as Error).message
      );
    }
  };
}