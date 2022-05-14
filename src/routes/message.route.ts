import express from "express";
import * as MessageController from '../controllers/message.controller';
import asyncHandler from 'express-async-handler';

const messageRouter = express.Router();

messageRouter.get('/user/:userId/delete-messages', asyncHandler(MessageController.getDeletedMessages));

messageRouter.post('/user/:userId/messages/create', asyncHandler(MessageController.sendMessage));

messageRouter.get('/user/:userId/messages', asyncHandler(MessageController.getAllMessages));

messageRouter.patch('/user/:userId/messages/:messageId/delete', asyncHandler(MessageController.deleteMessage));

messageRouter.get('/user/:userId/messages/:messageId', asyncHandler(MessageController.readMessage));

messageRouter.patch('/user/:userId/messages/:messageId', asyncHandler(MessageController.updateMessage));

export default messageRouter;
