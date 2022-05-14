import Joi from "joi";
import { checkUser} from "../repositories/user.repository";

const typeValues = ['SMS', 'email']

const checkTypeValidation = (type_value: string, helpers: any) => {
    if(!typeValues.find((value) => value === type_value)) {
        return helpers.error('any.invalid');
    }
    return type_value;
};

const checkUserValidation = async (id: string, helpers: any) => {
    try {
        const response = await checkUser(id);
        if (! response) return helpers.error('any.invalid');

        return response;

    } catch (e) {
       throw new Error("Erreur de l'appel api");
    }
};

export const schema = Joi.object().keys({
    type: Joi.string().custom(checkTypeValidation, 'type validation').required(),
    sendTo: Joi.string().custom(checkUserValidation, 'user validation').required(),
    sendBy: Joi.string().custom(checkUserValidation, 'user validation').required(),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
    deletedAt: Joi.string(),
    isReading: Joi.boolean(),
    isHistored: Joi.boolean(),
});