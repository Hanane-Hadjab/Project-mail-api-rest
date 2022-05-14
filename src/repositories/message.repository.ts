import {MessageInterface} from "../interfaces/MessageInterface";
import Message from "../models/Message";
import {v4 as uuid} from "uuid";
import * as messageValidation from "../validations/message.validation";
import User from "../models/User";

export const createNewMessage = async (body) => {
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
    };
    let res;
    try {
        await messageValidation.schema.validateAsync(messageBody)
        res = {};
    } catch (e) {
        return {error: e.stack};
    }
    if(!res.error) {
        const message = new Message(messageBody);
        message.save();

        let response: any;
        message ? response = {
            success: 'Le message a été bien crée',
        } : response = {
            error: "Erreur de création de message",
        };

        return response;
    }
};

export const getMessageById = async (messageId: string) => {
    const message = await Message.findById(messageId);
    const messageUPdated = await Message.updateOne({_id: messageId}, { $set:{ isReading: true }});
    try {
        const result = Promise.all([messageUPdated, message]);
        return result;
    } catch (e) {
        throw new Error("Erreur de récupération de message");
    }
};

export const updateMessage = async (messageId: string, body: any) => {
    try {
        const updatedMessage = Message.updateOne({_id: messageId}, { $set:  body});
        return updatedMessage;
    } catch (e) {
        throw new Error('Erreur de modification de message');
    }
};

export const deleteMessage  = async (messageId: string) => {
    try {
        const updatedMessage = Message.updateOne({_id: messageId}, { $set:  {deletedAt: new Date()}});
        return updatedMessage;
    } catch (e) {
        throw new Error('Erreur de suppression de message');
    }
};

export const getAllMessages = async () => {
    try {
        const data = await Message.find();

        return data;
    } catch (e) {
        throw new Error('Erreur de récupération de tous les messages');
    }
};

export default {
    createNewMessage,
    getMessageById,
    updateMessage,
    deleteMessage,
    getAllMessages
};