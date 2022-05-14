import {MessageInterface} from "../interfaces/MessageInterface";
import {v4 as uuid} from "uuid";
import Message from "../models/Message";
import {checkIfEmailIsValid, findMessageById} from "./message.repository";

/**
 * Function that create a new message to send
 * @param body
 */
export const sendResponse = async (userId: string, messageId: string ,body) => {

    const  message = await findMessageById(messageId);
    if(message.sendTo !== userId) {
        return Promise.reject("Access denied to response this email");
    }
    const responseBody: MessageInterface = {
        id: uuid(),
        type: body.type,
        sendTo: message.sendBy,
        sendBy: userId,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        isReading: false,
        isHistored: false,
        content: body.content,
        parentId: message.sendBy
    };

    const isValid = await checkIfEmailIsValid(responseBody);

    if (!isValid.error) {
        const message = new Message(responseBody);
        message.save();

        let response: any;
        message ? response = {
            success: 'The answer is sent',
        } : response = {
            error: "Error in sending a reply",
        };

        return response;
    }
};

export default {
    sendResponse
}