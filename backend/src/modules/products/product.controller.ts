import { Response } from "express";

import { ProductService } from "./product.service";

import { success, failure } from "@/utils/response";

import { AuthRequest } from "@/middlewares/auth.middleware";

export class ProductController {
  private service = new ProductService();

  create = async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const product =
        await this.service.create(
          req.body,
          req.user!.storeId
        );

      return success(
        res,
        "Product created successfully.",
        product,
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
  console.log("QUERY:", req.query);
  try {
    const products =
      await this.service.getAll(
        req.user!.storeId,
        req.query
      );

    return success(
      res,
      "Products fetched successfully.",
      products
    );
  } catch (error) {
    return failure(
      res,
      (error as Error).message
    );
  }
};
getById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const product = await this.service.getById(
      req.params.id as string,
      req.user!.storeId
    );
    return success(res, "Product fetched successfully.", product);
  } catch (error) {
    return failure(res, (error as Error).message, 404);
  }
};

update = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const product = await this.service.update(
      req.params.id as string,
      req.user!.storeId,
      req.body
    );
    return success(res, "Product updated successfully.", product);
  } catch (error) {
    return failure(res, (error as Error).message);
  }
};
}