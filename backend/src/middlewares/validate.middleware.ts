import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { failure } from "@/utils/response";

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return failure(res, errors.array()[0].msg as string, 422);
  }

  next();
}
