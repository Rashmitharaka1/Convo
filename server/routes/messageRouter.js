import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';
import protectRoute from '../middleware/auth.js';

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar); // <-- FIXED
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/seen/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/:id", protectRoute, sendMessage);

export default messageRouter;
import express from 'express';