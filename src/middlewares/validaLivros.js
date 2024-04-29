const joi = require('joi');
const { route } = require('../routes/routeLivros');

const LIVRO = joi.object({
    name_livro: joi.string().required(),
    num_pages: joi.string().required(),
    estoque:joi.string().required(),
    name_genero:joi.string().required(),
    
})

function validaLivros(req, res, next) {
    const {name_livro, num_pages, estoque,name_genero} = req.body;

    const {error} = LIVRO.validate({name_livro, num_pages, estoque,name_genero}); //O Joi captura um erro
    console.log(error);
    if (error) {
        next({status: 400, message: error.details[0].message});
    }

    // console.log(error);
    next();
}

module.exports = validaLivros;