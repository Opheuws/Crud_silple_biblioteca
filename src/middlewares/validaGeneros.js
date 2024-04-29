
const joi = require('joi');
const { route } = require('../routes/routeGeneros');

const GENERO = joi.object({
    name_genero: joi.string().required().min(2),
    description_genere: joi.string().required(),
})

function validaGeneros(req, res, next) {
    const {name_genero, description_genere } = req.body;

    const {error} = GENERO.validate({name_genero, description_genere}); //O Joi captura um erro
    console.log(error);
    if (error) {
        next({status: 400, message: error.details[0].message});
    }

    // console.log(error);
    next();
}

module.exports = validaGeneros;


