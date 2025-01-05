import { Router } from "express";
import { adminLogin, addAdmin } from "../controllers/index.js";

export const adminRouter = Router();

adminRouter.use("/create-admin", addAdmin);
adminRouter.use("/login", adminLogin);
