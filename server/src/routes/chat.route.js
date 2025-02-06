import { Router } from "express";
import { authenticate } from "../middlewares/index.js";
import { createChat } from "../controllers/index.js";

export const chatRouter = Router();

chatRouter.post("/create-chat", authenticate, createChat);
