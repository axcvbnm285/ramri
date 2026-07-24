import { Router } from "express";
import { StorefrontController } from "./storefront.controller";

const router = Router();
const controller = new StorefrontController();

router.get("/categories", controller.getCategories);
router.get("/promotions", controller.getPromotions);
router.get("/products", controller.getProducts);
router.get("/products/:slug", controller.getProductBySlug);

export { router as storefrontRoutes };
