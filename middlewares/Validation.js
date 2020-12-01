const Joi = require('joi');
const Boarder = require('../models/boarderModel');

// Stil unused
const boarderExist = async (req,res,next) => {
    const boarder = await Boarder.findById(req.params.id) 
    if(!boarder) { return res.status(404).json({ message:'Boarder not found.'})}
    next()
}

// --------------- AUTH VALIDATORS ------------------ //
const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(100).required(),
        password: Joi.string().min(5).max(1024).required(),
        role: Joi.string().valid('admin', 'demo').required()
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(260).required(),
        password: Joi.string().max(1024),
    });
    return schema.validate(data);
}

const changePassValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(data);
}

module.exports.boarderExist = boarderExist
module.exports.changePassValidation = changePassValidation
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation