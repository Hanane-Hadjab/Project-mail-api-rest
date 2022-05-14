import express from "express";
import * as ResponseController from '../controllers/response.controller';
import asyncHandler from 'express-async-handler';

const responseRouter = express.Router();

responseRouter.post('/user/:userId/messages/:messageId/response', asyncHandler(ResponseController.sendResponse));

export default responseRouter;