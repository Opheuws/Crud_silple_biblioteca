
const joi = require('joi');
const { route } = require('../routes/user');

const USUARIO = joi.object({
    name: joi.string().required().min(2),
    nivel_user: joi.string().required(),
})

function validaUsuarios(req, res, next) {
    const {name, nivel_user } = req.body;

    const {error} = MANGA.validate({name, nivel_user}); //O Joi captura um erro
    console.log(error);
    if (error) {
        next({status: 400, message: error.details[0].message});
    }

    // console.log(error);
    next();
}

module.exports = validaUsuarios;


