const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling get request to /books'
    })
});

router.post('/', (req, res, next) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        country: req.body.country,
    };
    res.status(201).json({
        message: 'handling post request to /books',
        createdBook: book
    })
});

router.get('/:bookId', (req, res, next) => {
   const id = req.params.bookId;
   if( id === 'special') {
       res.status(200).json({
           message: 'you discovered the special id',
           id: id
       });
   } else {
       res.status(200).json({
           message: 'hi'
       });
   }
});

router.patch('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: 'updated product number ' + id
    });
});

router.delete('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    res.status(200).json({
        message: 'deleted product number ' + id
    });
});

module.exports = router;