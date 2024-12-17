import joi from "joi";


const seller = joi.object({
    name: joi.string().required(),
    level: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
})

export = { seller }