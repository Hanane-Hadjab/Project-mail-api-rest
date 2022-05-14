import Joi from "joi";

export const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    isConnected: Joi.boolean(),
});