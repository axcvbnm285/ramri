import { Request, Response } from "express";
import { CustomerService } from "./customer.service";
import { success, failure } from "@/utils/response";
import { generateToken } from "@/utils/jwt";
import { getAuthCookieOptions } from "@/utils/cookieOptions";
import { AuthRequest } from "@/middlewares/auth.middleware";
import { CustomerAuthRequest } from "@/middlewares/customerAuth.middleware";

export class CustomerController {
  private service = new CustomerService();

  checkPhone = async (req: Request, res: Response) => {
    try {
      const result = await this.service.checkPhone(req.body.phone);
      return success(res, "Checked.", result);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  signup = async (req: Request, res: Response) => {
    try {
      const customer = await this.service.signup(req.body);

      const token = generateToken(customer.id);
      res.cookie("customer_token", token, getAuthCookieOptions());

      return success(res, "Account created successfully.", customer, 201);
    } catch (error) {
      return failure(res, (error as Error).message, 400);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const customer = await this.service.login(req.body);

      const token = generateToken(customer.id);
      res.cookie("customer_token", token, getAuthCookieOptions());

      return success(res, "Login successful.", customer);
    } catch (error) {
      return failure(res, (error as Error).message, 401);
    }
  };

  logout = async (_req: Request, res: Response) => {
    res.clearCookie("customer_token");
    return success(res, "Logged out successfully.");
  };

  me = async (req: CustomerAuthRequest, res: Response) => {
    return success(res, "Current customer", req.customer);
  };

  listAddresses = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const addresses = await this.service.listAddresses(req.customer!.id);
      return success(res, "Addresses fetched successfully.", addresses);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  addAddress = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const address = await this.service.addAddress(req.customer!.id, req.body);
      return success(res, "Address added successfully.", address, 201);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  updateAddress = async (req: CustomerAuthRequest, res: Response) => {
    try {
      const address = await this.service.updateAddress(
        req.params.id as string,
        req.customer!.id,
        req.body
      );
      return success(res, "Address updated successfully.", address);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  deleteAddress = async (req: CustomerAuthRequest, res: Response) => {
    try {
      await this.service.deleteAddress(req.params.id as string, req.customer!.id);
      return success(res, "Address deleted successfully.");
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getAll = async (req: AuthRequest, res: Response) => {
    try {
      const customers = await this.service.getAll(req.user!.storeId, req.query);
      return success(res, "Customers fetched successfully.", customers);
    } catch (error) {
      return failure(res, (error as Error).message);
    }
  };

  getById = async (req: AuthRequest, res: Response) => {
    try {
      const customer = await this.service.getDetail(
        req.params.id as string,
        req.user!.storeId
      );
      return success(res, "Customer fetched successfully.", customer);
    } catch (error) {
      return failure(res, (error as Error).message, 404);
    }
  };
}
