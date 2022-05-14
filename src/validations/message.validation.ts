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
        if (response) return true ;
        return helpers.error('any.invalid');

    } catch (e) {
       throw new Error("Erreur de l'appel api");
    }
};

export const schema = Joi.object().keys({
    type: Joi.custom(checkTypeValidation, 'type validation').required(),
    sendTo: Joi.custom(checkUserValidation, 'user validation').required(),
    sendBy: Joi.custom(checkUserValidation, 'send by validation').required(),
    content: Joi.string().required(),
});