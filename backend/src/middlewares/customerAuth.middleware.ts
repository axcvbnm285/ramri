import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface CustomerAuthRequest extends Request {
  customer?: {
    id: string;
    name: string;
    phone: string;
    storeId: string;
  };
}

export async function customerAuthMiddleware(
  req: CustomerAuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.customer_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
    };

    const customer = await prisma.customer.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        storeId: true,
      },
    });

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.customer = customer;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}
