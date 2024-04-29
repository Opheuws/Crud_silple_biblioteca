const express = require('express')
const connection = require('../db/connection');
const route = express.Router();

route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM livros');
    res.status(200).json(result);
});

route.post('/', async (req, res) => {
    const {name_livro,num_pages, estoque, name_genero} = req.body;
    const [result] = await connection.execute('INSERT INTO livros(name_livro,num_pages, estoque, name_genero) VALUES(?,?,?,?)',[name_livro,num_pages, estoque, name_genero])
   
    const newLivro = {
        id:result.insertId,
        name_livro,
        num_pages,
        estoque,
        name_genero
    }
    res.status(201).json(newLivro);
})
route.put('/:id', (req, res) => {
    const {name_livro,num_pages, estoque, name_genero} = req.body;
    const {id} = req.params;

    const updateLivros = connection.execute(`UPDATE livros
    SET name_livro = ?,  num_pages = ? , estoque=?, name_genero=?
    WHERE id = ?`, [name_livro, num_pages, estoque,name_genero, id])

    const newLivro = {
        id:result.insertId(),
        name_livro,
        num_pages,
        estoque,
        name_genero
    }

    res.status(201).json(newLivro);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    await connection.execute('DELETE FROM livros WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM livros WHERE id =?',[id]);
    res.status(200).json(result);
});


    module.exports = route;