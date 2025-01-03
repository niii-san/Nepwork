import { Router } from "express";
import { adminLogin, createAdmin } from "../controllers/index.js";

export const adminRouter = Router();

adminRouter.use("/create-admin", createAdmin);
adminRouter.use("/login", adminLogin);
