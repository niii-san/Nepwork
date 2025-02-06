import { Router } from "express";
import { authenticate } from "../middlewares/index.js";
import { createChat, getChats } from "../controllers/index.js";

export const chatRouter = Router();

chatRouter.post("/create-chat", authenticate, createChat);
chatRouter.get("/", authenticate, getChats);
