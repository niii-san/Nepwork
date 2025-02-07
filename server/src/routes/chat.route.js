import { Router } from "express";
import { authenticate } from "../middlewares/index.js";
import { createChat, getChats, getConnections } from "../controllers/index.js";

export const chatRouter = Router();

chatRouter.get("/", authenticate, getChats);
chatRouter.get("/get-connections", authenticate, getConnections);

chatRouter.post("/create-chat", authenticate, createChat);
