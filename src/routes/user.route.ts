import express from "express";
import * as UserController from '../controllers/user.controller';
import asyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.get('/', asyncHandler(UserController.getUsers));

userRouter.post('/create', asyncHandler(UserController.createUser));

userRouter.get('/:userId', asyncHandler(UserController.getUserById));

userRouter.delete('/:userId', asyncHandler(UserController.deleteUserById));

userRouter.get('/:userId/received-messages', asyncHandler(UserController.getReceivedMessages));

userRouter.patch('/:userId/login', asyncHandler(UserController.loginUser));

userRouter.patch('/:userId/logout', asyncHandler(UserController.logOutUser));

export default userRouter;
