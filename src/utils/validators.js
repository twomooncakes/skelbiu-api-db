const joi = require('joi');
const jwt = require('jsonwebtoken');

async function validateUserRegister(req, res, next) {
    console.log('validated:', req.body);

    // validate body using joi
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        repeatPassword: joi.ref('password'),
        city: joi.string().max(90).regex(/^[a-zA-z]+([\s][a-zA-Z]+)*$/, 'letters and spaces only').optional().allow(''),
        phone: joi.string().regex(/^(\+370|8)([0-9]{8})$/).optional().allow('')
    });
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        console.warn(error);
        res.status(400).send({
            error: error.details.map((e) => ({
                errorMsg: e.message,
                field: e.context.key,
            })),
        });
        return false;
    }
}


async function validateUserLogin(req, res, next) {
    console.log('validated:', req.body);

    // validate body using joi
    const schema = joi.object({
        email: joi.string().email({ minDomainSegments: 2 }).required(),
        password: joi.string().min(6).required(),
    });
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        console.warn(error);
        res.status(400).send({
            error: error.details.map((e) => ({
                errorMsg: e.message,
                field: e.context.key,
            })),
        });
        return false;
    }
}

async function validateNewListing(req, res, next) {
    console.log('validated:', req.body);
    // validate body using joi
    // weird stuff with validation
    const schema = joi.object({
        title: joi.string().max(25),
        description: joi.string().min(3).optional().allow(''),
        price: joi.number().min(0),
        mainImage: joi.string().optional().allow('')
    });
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        console.warn(error);
        res.status(400).send({
            error: error.details.map((e) => ({
                errorMsg: e.message,
                field: e.context.key,
            })),
        });
        return false;
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(400).json({ error: "Unauthorized request"});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            return res.status(403).json({ error: "Bad token"});
        }
        console.log("data in jwt", data)
        req.id = data.id;
        next();
    })
}

module.exports = {
    validateUserRegister, validateUserLogin, validateNewListing, authenticateToken
};
