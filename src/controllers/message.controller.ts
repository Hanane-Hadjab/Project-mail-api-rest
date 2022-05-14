import MessageRepository from '../repositories/message.repository';

export const readMessage = async (req, res) => {
    if (req.params.messageId) {
        try {
            const data = await MessageRepository.readMessage(req.params.messageId);
            res.json(data[1]);
        } catch (err) {
            res.json({message: err});
        }
    }
};

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

export const updateMessage = async (req, res) => {
    if (req.params.messageId) {
        const body = req.body;
        try {
            const updatedMessage = await MessageRepository.updateMessage(req.params.messageId, body);
            res.json(updatedMessage);
        } catch (e) {
            res.json({message: e});
        }
    }
};

export const deleteMessage = async (req, res) => {
    if (req.params.messageId) {
        try {
            const deletedMessage = await MessageRepository.deleteMessage(req.params.messageId);
            res.json(deletedMessage);
        } catch (e) {
            res.json({message: e});
        }
    }
};

export const getAllMessages = async (req, res) => {
    try {
        const data = await MessageRepository.getAllMessages();
        res.json(data);
    } catch (err) {
        res.json({message: err});
    }
};

export const getDeletedMessages = async (req, res) => {
    try {
        const data = await MessageRepository.getDeletedMessages();
        res.json(data);
    } catch (err) {
        res.json({message: err});
    }
};
