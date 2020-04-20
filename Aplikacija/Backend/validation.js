const Joi = require('@hapi/joi');
const register_user = require('./validation/userSchema');
const added_post = require('./validation/impressionSchema');
const added_comment = require('./validation/commentSchema');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

// const impressionValidation = (data) => {
//     return added_post.validate(data);
// }
// const commentValidation = (data) => {
//     const added_comment = Joi.object({
//         content: Joi.string().required(),
//         productid: Joi.required(),
//         korisnikid: Joi.required()
//     });
//     return added_comment.validate(data);
// }

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
//module.exports.commentValidation = commentValidation;
//module.exports.impressionValidation = impressionValidation;