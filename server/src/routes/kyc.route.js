import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/index.js";
import { getAllKyc } from "../controllers/index.js";

export const kycRouter = Router();

kycRouter.get("/get-all-kyc", authenticate, authorizeAdmin, getAllKyc);
