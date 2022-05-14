import {MessageInterface} from "../interfaces/MessageInterface";
import Message from "../models/Message";
import {v4 as uuid} from "uuid";
import * as messageValidation from "../validations/message.validation";

/**
 * Function to check if message to send is valid
 * @param message
 */
export const checkIfEmailIsValid = async (message: any) => {
    let res;
    try {
        await messageValidation.schema.validate(message)
        res = {};
    } catch (e) {
        return {error: e.stack};
    }
    return res;
};

/**
 * Function that create a new message to send
 * @param body
 */
export const sendMessage = async (body) => {
    const messageBody: MessageInterface = {
        id: uuid(),
        type: body.type,
        sendTo: body.sendTo,
        sendBy: body.sendBy,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
        isReading: false,
        isHistored: false,
        content: body.content,
        parentId: null
    };

    const isValid = await checkIfEmailIsValid(messageBody);

    if (!isValid.error) {
        const message = new Message(messageBody);
        message.save();

        let response: any;
        message ? response = {
            success: 'The message has been sent.',
        } : response = {
            error: "Error sending message",
        };

        return response;
    }
};

/**
 * Search message by id in data base
 * @param messageId
 */
export const findMessageById = async (messageId: string) => {
    const messaeg =  await Message.findById(messageId);
    return messaeg;
}

/**
 * retrun message by Id
 * @param userId
 * @param messageId
 */
export const readMessage = async (userId: string, messageId: string) => {
    const message = await findMessageById(messageId);

    if (message.sendTo !== userId && message.sendBy !== userId) {
        return Promise.reject("Access denied to read this message");
    }
    const messageUPdated = await Message.updateOne({_id: messageId}, {$set: {isReading: true}});
    try {
        const result = Promise.all([messageUPdated, message]);
        return result;

    } catch (e) {
        throw new Error("Error in message retrieval");
    }
};

/**
 * Update message by id
 * @param userId
 * @param messageId
 * @param body
 */
export const updateMessage = async (userId: string, messageId: string, body: any) => {
    try {
        const message = await findMessageById(messageId);
        if (message.sendTo !== userId && message.sendBy !== userId) {
            return Promise.reject("Access denied to update this message");
        }

        const updatedMessage = Message.updateOne({_id: messageId}, {$set: body});

        return updatedMessage;

    } catch (e) {
        throw new Error('Error in message modification');
    }
};

/**
 * Delete message by Id
 * @param userId
 * @param messageId
 */
export const deleteMessage = async (userId: string, messageId: string) => {
    try {
        const message = await findMessageById(messageId);
        if (message.sendTo !== userId && message.sendBy !== userId) {
            return Promise.reject("Access denied to delete this message");
        }
        const updatedMessage = await Message.updateOne({_id: messageId}, {$set: {deletedAt: new Date()}});
        return updatedMessage;
    } catch (e) {
        throw new Error('Delete message error');
    }
};

/**
 * Get user's messages
 * @param userId
 */
export const getAllMessages = async (userId: string) => {
    try {
        const data = await Message.find(
            { $or: [{sendTo: userId}, {sendBy: userId}]
            });

        return data;
    } catch (e) {
        throw new Error('Error retrieving all messages');
    }
};

/**
 * Get user's deleted messages
 * @param userId
 */
export const getDeletedMessages = async (userId: string) => {
    try {
        const data = await Message.find({
            $or: [{ sendTo: userId }, {sendBy: userId}],
            deletedAt : { $ne: null },
        });
        return data;
    } catch (e) {
        throw new Error('Error in retrieving messages from the trash.');
    }
};

export default {
    sendMessage,
    readMessage,
    updateMessage,
    deleteMessage,
    getAllMessages,
    getDeletedMessages
};