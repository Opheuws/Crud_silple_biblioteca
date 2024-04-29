const express = require('express');
require('express-async-errors');
const {user}= require('./routes')
const {routeLivros}= require('./routes');
const {routeGeneros}= require('./routes');

require('dotenv').config();
const validaGeneros = require('./middlewares/validaGeneros');
const validaLivros = require('./middlewares/validaLivros');
const validaUsuarios = require('./middlewares/validaUsuarios');

const variavelTest = process.env.TESTE


const errorMiddleware = require('./middlewares/errorMiddleware')
const app = express();
app.use(express.json());
app.use('/usuarios', validaUsuarios, user);
app.use('/livros', validaLivros, routeLivros);
app.use('/generos', validaGeneros, routeGeneros);
app.use(errorMiddleware)

app.get('/', async (req, res) => {
    res.status(200).send('olá', variavelTest); 
 });

module.exports ={
    app,
}
