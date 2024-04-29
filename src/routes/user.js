const express = require('express')
const connection = require('../db/connection');
const route = express.Router();

route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM usuarios');
    res.status(200).json(result);
});

route.post('/', async (req, res) => {
    const { name, nivel_user } = req.body;
    const [result] = await connection.execute('INSERT INTO usuarios(name, nivel_user) VALUES(?,?)', [name, nivel_user]);

    const newUsuario = {
        id: result.insertId,
        name,
        nivel_user
    };
    res.status(201).json(newUsuario);
});

route.put('/:id', async (req, res) => {
    const { name, nivel_user } = req.body;
    const { id } = req.params;

    await connection.execute(`UPDATE usuarios SET name = ?, nivel_user = ? WHERE id = ?`, [name, nivel_user, id]);

    const newUsuario = {
        id: parseInt(id),
        name,
        nivel_user
    };

    res.status(201).json(newUsuario);
});

route.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await connection.execute('DELETE FROM usuarios WHERE id=?', [id]);

    res.status(204).send();
});

route.get('/:id', async (req, res) => {
    const { id } = req.params;
    const [[result]] = await connection.execute('SELECT * FROM usuarios WHERE id =?', [id]);
    res.status(200).json(result);
});

module.exports = route;
