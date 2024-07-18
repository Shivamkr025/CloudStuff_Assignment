import Joi from 'joi'

export const signupSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9@#$%]{6,30}$')).required(),
    role: Joi.string().valid('Employee', 'User'),
    company: Joi.string().required()
})