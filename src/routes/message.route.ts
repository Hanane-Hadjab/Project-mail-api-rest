import express from "express";
import * as MessageController from '../controllers/message.controller';
import asyncHandler from 'express-async-handler';

const messageRouter = express.Router();

messageRouter.get('/delete-messages', asyncHandler(MessageController.getDeletedMessages));

messageRouter.post('/create', asyncHandler(MessageController.createMessage));

messageRouter.get('/', asyncHandler(MessageController.getAllMessages));

messageRouter.patch('/:messageId/delete', asyncHandler(MessageController.deleteMessage));

messageRouter.get('/:messageId', asyncHandler(MessageController.getMessageById));

messageRouter.patch('/:messageId', asyncHandler(MessageController.updateMessage));

export default messageRouter;
