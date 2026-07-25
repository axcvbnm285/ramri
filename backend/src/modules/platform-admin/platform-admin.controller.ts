import { Request, Response } from "express";

import { PlatformAdminService } from "./platform-admin.service";

import { success, failure } from "@/utils/response";
import { generatePlatformToken } from "@/utils/jwt";
import { getAuthCookieOptions } from "@/utils/cookieOptions";

export class PlatformAdminController {
  private service = new PlatformAdminService();

  login = async (req: Request, res: Response) => {
    try {
      const admin = this.service.login(req.body.email, req.body.password);

      const token = generatePlatformToken();

      res.cookie("platform_token", token, getAuthCookieOptions());

      return success(res, "Login successful.", admin);
    } catch (error) {
      return failure(res, (error as Error).message, 401);
    }
  };

  logout = async (_req: Request, res: Response) => {
    res.clearCookie("platform_token");

    return success(res, "Logged out successfully.");
  };

  me = async (_req: Request, res: Response) => {
    return success(res, "Current admin", this.service.me());
  };

  pendingStores = async (_req: Request, res: Response) => {
    try {
      const stores = await this.service.getPendingStores();
      return success(res, "Pending stores fetched.", stores);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  approveStore = async (req: Request, res: Response) => {
    try {
      const store = await this.service.approveStore(req.params.id as string);
      return success(res, "Store approved.", store);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  rejectStore = async (req: Request, res: Response) => {
    try {
      const store = await this.service.rejectStore(req.params.id as string);
      return success(res, "Store rejected.", store);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  allStores = async (_req: Request, res: Response) => {
    try {
      const stores = await this.service.getAllStores();
      return success(res, "Stores fetched.", stores);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  deleteStore = async (req: Request, res: Response) => {
    try {
      const store = await this.service.deleteStore(req.params.id as string);
      return success(res, "Store deleted.", store);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  reactivateStore = async (req: Request, res: Response) => {
    try {
      const store = await this.service.reactivateStore(req.params.id as string);
      return success(res, "Store reactivated.", store);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  stats = async (_req: Request, res: Response) => {
    try {
      const stats = await this.service.getStats();
      return success(res, "Stats fetched.", stats);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };
}
