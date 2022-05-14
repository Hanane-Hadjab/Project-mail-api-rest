import MessageRepository from '../repositories/message.repository';

/**
 * Function to read message
 * @param req
 * @param res
 */
export const readMessage = async (req, res) => {
    if (req.params.messageId && req.params.userId) {
        try {
            const data = await MessageRepository.readMessage(req.params.userId, req.params.messageId);
            res.json(data[1]);
        } catch (err) {
            res.json({message: err});
        }
    }
};

/**
 * Function to send message
 * @param req
 * @param res
 */
export const sendMessage = async (req, res) => {
    if (req.body) {
        try {
            const response = await MessageRepository.sendMessage(req.body);
            if (response.success) {
                res.json(response);
            } else {
                throw new Error("Erreur de création de message");
            }
        } catch (err) {
            res.json({message: err});
        }
    }
};

/**
 * Function to update message
 * @param req
 * @param res
 */
export const updateMessage = async (req, res) => {
    if (req.params.messageId && req.params.userId) {
        const body = req.body;
        try {
            const updatedMessage = await MessageRepository.updateMessage(req.params.userId, req.params.messageId, body);
            console.log(updatedMessage);
            res.json(updatedMessage);
        } catch (e) {
            res.json({message: e});
        }
    }
};

/**
 * Function to delete message
 * @param req
 * @param res
 */
export const deleteMessage = async (req, res) => {
    if (req.params.messageId && req.params.userId) {
        try {
            const deletedMessage = await MessageRepository.deleteMessage(req.params.userId, req.params.messageId);
            res.json(deletedMessage);
        } catch (e) {
            res.json({message: e});
        }
    }
};

/**
 * Function to get all messages of data base
 * @param req
 * @param res
 */
export const getAllMessages = async (req, res) => {
    if (req.params.userId) {
        try {
            const data = await MessageRepository.getAllMessages(req.params.userId);
            res.json(data);
        } catch (err) {
            res.json({message: err});
        }
    }
};

/**
 * Function to get deleted messages
 * @param req
 * @param res
 */
export const getDeletedMessages = async (req, res) => {
    if (req.params.userId) {
        try {
            const data = await MessageRepository.getDeletedMessages(req.params.userId);
            res.json(data);
        } catch (err) {
            res.json({message: err});
        }
    }
};
