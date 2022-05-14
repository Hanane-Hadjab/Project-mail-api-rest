import { mockRequest, mockResponse } from "jest-mock-req-res";
import * as MessageRepository from "../../../repositories/message.repository";
import {db} from '../../../config/db.config';
import mongoose from "mongoose";

describe('Test Message repository functions', () => {
    describe('Test readMessage function',  () => {
        let req: any;
        let res: any;

        const params = {
            userId: "827f5498e6f830b71d3727cb",
            messageId: "627f5498e6f830b71d3727ca",
        };
        let mockFindMessageById: any;
        const readMessageResponse = {
            "id": "627f5498e6f830b71d3727ca",
            "type": "SMS",
            "sendTo": "627f0eefc2bddcd209aa21ba",
            "sendBy": "627f0e5037aaf7c22c912587",
            "deletedAt": null,
            "isReading": false,
            "isHistored": false,
            "content": "Réponse message 6",
        };

        beforeEach(() => {
            req = mockRequest();
            req.params = { ... params };
            res = mockResponse();
            db.then();
        });
        afterEach(() => {
            mongoose.connection.close();
        });

        afterAll(() => {
           mongoose.connection.close();
        });

        it('test findMessageById', async () => {
            const message = await MessageRepository.findMessageById(params.messageId);
            const result = {
                type: 'SMS',
                sendTo: '627f0eefc2bddcd209aa21ba',
                sendBy: '627f0e5037aaf7c22c912587',
                deletedAt: null,
                isReading: false,
                isHistored: false,
                content: 'Réponse message 6',
                parentId: '627f0eefc2bddcd209aa21ba',
            }
            expect(message.type).toStrictEqual(result.type);
            expect(message.sendTo).toStrictEqual(result.sendTo);
            expect(message.sendBy).toStrictEqual(result.sendBy);
        });

        it("should return access denied to read message", async () => {
             mockFindMessageById = jest
                .spyOn(MessageRepository,'findMessageById')
                .mockResolvedValueOnce(readMessageResponse);

             req.params.userId = "678f0eefc2bddcd209aa56ba";

            try {
                await  MessageRepository.readMessage(req.params.userId, req.params.messageId);
            } catch (e) {
                expect(e).toEqual("Access denied to read this message");
            }
        });

        it('should return result', async () => {
            mockFindMessageById = jest
                .spyOn(MessageRepository,'findMessageById')
                .mockResolvedValueOnce(readMessageResponse);

            req.params.userId = "627f0eefc2bddcd209aa21ba";

            const messages =
                {
                    id: '627f5498e6f830b71d3727ca',
                    type: 'SMS',
                    sendTo: '627f0eefc2bddcd209aa21ba',
                    sendBy: '627f0e5037aaf7c22c912587',
                    deletedAt: null,
                    isReading: false,
                    isHistored: false,
                    content: 'Réponse message 6'
                }

            const result = await MessageRepository.readMessage(req.params.userId, req.params.messageId);
            expect(result[1].type).toStrictEqual(messages.type)
            expect(result[1].content).toStrictEqual(messages.content)
            expect(result[1].sendTo).toStrictEqual(messages.sendTo)
            expect(result[1].sendBy).toStrictEqual(messages.sendBy);
        });
    });
});