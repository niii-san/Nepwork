import { Router } from "express";
import { authenticate } from "../middlewares/index.js";
import {
    createChat,
    getChats,
    getConnections,
    newMessage,
} from "../controllers/index.js";

export const chatRouter = Router();

chatRouter.get("/", authenticate, getChats);
chatRouter.get("/get-connections", authenticate, getConnections);

chatRouter.delete("/delete/:chatId");

chatRouter.post("/create-chat", authenticate, createChat);
chatRouter.post("/:chatId/new-message", authenticate, newMessage);
