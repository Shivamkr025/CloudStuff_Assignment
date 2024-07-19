import Joi from 'joi'

const signupValidation = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const projectValidation = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(30).required()
});

const taskValidation = Joi.object({
    project: Joi.string().required(),
    taskName: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    status: Joi.string().valid('Backlog', 'In Discussion', 'In Progress', 'Done').required(),
    tags: Joi.array().items(Joi.string()),
    dueDate: Joi.date().required(),
    assignedUser: Joi.string().email()
});

export {signupValidation , loginValidation , projectValidation , taskValidation}