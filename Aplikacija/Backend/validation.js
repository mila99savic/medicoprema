const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        address: Joi.string().min(6).required(),
        number: Joi.number().min(6).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const registerEmployedValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(3).required(),
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
};

const updateUserValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const commentValidation = (data) => {
    const schema = Joi.object({
        content: Joi.string().min(2).required(),
        nameProduct: Joi.string().required(),
        productid: Joi.string(),
        korisnikid: Joi.string().required()
    });
    return schema.validate(data);
};

const impressionValidation = (data) => {
    const schema = Joi.object({
        content: Joi.string().min(2).required(),
        korisnikid: Joi.string().required(),
        zaposlenid: Joi.string().required()
    });
    return schema.validate(data);
};

const requestValidation = (data) => {
    const schema = Joi.object({
        location: Joi.string().min(3).required(),
        date: Joi.string().required(),
        comment: Joi.string(),
        type: Joi.string().required(),
        status: Joi.string(),
        korisnikid: Joi.string().required()
    });
    return schema.validate(data);
};

const taskValidation = (data) => {
    const schema = Joi.object({
        location: Joi.string().min(3).required(),
        date: Joi.string().required(),
        comment: Joi.string(),
        type: Joi.string().required(),
        status: Joi.string(),
        korisnikid: Joi.string().required(),
        zaposleniId: Joi.string()
    });
    return schema.validate(data);
}

const productValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required()
    });
    return schema.validate(data);
}

const orderValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required()
    });
    return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.registerEmployedValidation = registerEmployedValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateUserValidation = updateUserValidation;
module.exports.commentValidation = commentValidation;
module.exports.impressionValidation = impressionValidation;
module.exports.requestValidation = requestValidation;
module.exports.taskValidation = taskValidation;
module.exports.productValidation = productValidation;
module.exports.orderValidation = orderValidation;