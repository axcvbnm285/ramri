import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { authRoutes } from "./modules/auth";
import { categoryRoutes } from "@/modules/categories";
import { productRoutes } from "@/modules/products";
import uploadRoutes from "@/uploads/upload.routes";
import { customerRoutes } from "@/modules/customers";
import { orderRoutes } from "@/modules/orders";
import { inventoryRoutes } from "@/modules/inventory";
import { analyticsRoutes } from "@/modules/analytics";
import { storefrontRoutes } from "@/modules/storefront";





const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/storefront", storefrontRoutes);

app.get("/", (_, res) => {
  res.json({ success: true, message: "Ramri API Running 🚀" });
});

export default app;
