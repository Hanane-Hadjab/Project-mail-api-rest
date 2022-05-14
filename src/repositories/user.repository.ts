import User from "../models/User";
import * as userValidation from "../validations/user.validation";
import Message from "../models/Message";

export const createNewUser = async (body) => {
    let res;
    try {
        await userValidation.schema.validateAsync(body)
        res = {};
    } catch (e) {
        return {error: e.stack};
    }

    if (!res.error) {
        const user = new User(body);
        user.save();

        let response: any;
        user ? response = {
            success: "L'utilisateur a été bien crée",
        } : response = {
            error: "Erreur de création de l'utilisateur",
        };

        return response;
    }
};
export const checkUser = async (id: string) => {
    const res = await User.findById(id).exec();
    if (res) return true;
    return false;
};

export const getAllUsers = async () => {
    try {
        const data = await User.find();

        return data;
    } catch (e) {
        throw new Error('Erreur de récupération des utilisateurs');
    }
}

export const getUserById = async (userId: string) => {
    try {
        const data = await User.findById(userId);
        return data;
    } catch (e) {
        throw new Error("Erreur de récupération de l'utilisateur");
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const removedUser = User.remove({_id: userId});

        return removedUser;
    } catch (err) {
        throw new Error("Erreur de récupération de l'utilisateur");
    }
};

export const getReceivedMessages = async (userId: string) => {
    try {
        const data = await Message.find({sendTo: userId});
        return data;

    } catch (e) {
        throw new Error("Erreur de récupération des message récu par l'utilisateur");
    }
};

export const loginUser = async (userId: string) => {
    try {
        const user_existing = await checkUser(userId);
        const user = await User.updateOne({_id: userId}, {$set: {isConnected: true}});
        const result = Promise.all([user_existing, user]);

        return result;
    } catch (e) {
        throw new Error("erreur de login de l'utilisateur");
    }
};

export default {
    createNewUser,
    checkUser,
    getAllUsers,
    getUserById,
    deleteUser,
    getReceivedMessages,
    loginUser
};

