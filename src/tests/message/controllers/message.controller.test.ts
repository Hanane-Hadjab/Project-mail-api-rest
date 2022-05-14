import {mockRequest} from "jest-mock-req-res";
import {db} from '../../../config/db.config';
import mongoose from "mongoose";
import * as MessageController from "../../../controllers/message.controller";
import * as MessageRepository from "../../../repositories/message.repository";
import {Response} from 'express';

describe('Test Message controller functions', () => {
    describe('Test readMessage function', () => {
        let req: any;

        const params = {
            userId: "827f5498e6f830b71d3727cb",
            messageId: "627f5498e6f830b71d3727ca",
        };
        let res: Response;
        let mockReadMessage: any;
        const mockResponseTest = () => {
            const res: any = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        beforeEach(() => {
            req = mockRequest();
            req.params = {...params};
            res = mockResponseTest();
            db.then();
        });
        afterEach(() => {
            mongoose.connection.close();
        });

        afterAll(() => {
            mongoose.connection.close();
        });

        it('should ruturn success result', async () => {

            const test: any = {
                "id": "627f5498e6f830b71d3727ca",
                "type": "SMS",
                "sendTo": "627f0eefc2bddcd209aa21ba",
                "sendBy": "627f0e5037aaf7c22c912587",
                "deletedAt": null,
                "isReading": false,
                "isHistored": false,
                "content": "Réponse message 6",
            };
            mockReadMessage = jest.spyOn(MessageRepository, 'readMessage').mockResolvedValue(test);
            req.params.userId = "627f0eefc2bddcd209aa21ba";
            await MessageController.readMessage(req, res);

            expect(res.json).toBeCalledTimes(1);
        });
    });
});