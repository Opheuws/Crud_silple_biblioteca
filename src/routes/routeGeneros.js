const express = require('express')
const connection = require('../db/connection');
const route = express.Router();

route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM generos');
    res.status(200).json(result);
});

route.post('/', async (req, res) => {
    const { name_genero, description_genere } = req.body;
    const [result] = await connection.execute('INSERT INTO generos(name_genero, description_genere) VALUES(?,?)', [name_genero, description_genere]);

    const newGenero = {
        id: result.insertId,
        name_genero, 
        description_genere
    };
    res.status(201).json(newGenero);
});

route.put('/:id', async (req, res) => {
    const { name_genero, description_genere } = req.body;
    const { id } = req.params;

    await connection.execute(`UPDATE generos SET name_genero = ?, description_genere = ? WHERE id = ?`, [name_genero, description_genere, id]);

    const newGenero = {
        id: parseInt(id),
        name_genero, 
        description_genere
    };

    res.status(201).json(newGenero);
});

route.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await connection.execute('DELETE FROM generos WHERE id=?', [id]);

    res.status(204).send();
});

route.get('/:id', async (req, res) => {
    const { id } = req.params;
    const [[result]] = await connection.execute('SELECT * FROM generos WHERE id =?', [id]);
    res.status(200).json(result);
});

module.exports = route;
