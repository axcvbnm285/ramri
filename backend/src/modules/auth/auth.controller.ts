import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { success, failure } from "@/utils/response";
import { generateToken } from "@/utils/jwt";
import { getAuthCookieOptions } from "@/utils/cookieOptions";
import { AuthRequest } from "@/middlewares/auth.middleware";

export class AuthController {
  private service = new AuthService();

  signup = async (req: Request, res: Response) => {
    try {
      const result = await this.service.signup(req.body);

      const token = generateToken(result.user.id);

      res.cookie("token", token, getAuthCookieOptions());

      return success(
        res,
        "Account created successfully.",
        result,
        201
      );
    } catch (error) {
      return failure(
        res,
        (error as Error).message,
        400
      );
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user = await this.service.login(req.body);

      const token = generateToken(user.id);

      res.cookie("token", token, getAuthCookieOptions());

      return success(
        res,
        "Login successful.",
        user
      );
    } catch (error) {
      return failure(
        res,
        (error as Error).message,
        401
      );
    }
  };
  me = async (req: AuthRequest, res: Response) => {
  try {
    return success(
      res,
      "Current user",
      req.user
    );
  } catch {
    return failure(
      res,
      "Unauthorized",
      401
    );
  }
};
logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");

  return success(
    res,
    "Logged out successfully."
  );
};
}