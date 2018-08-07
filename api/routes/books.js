const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/book');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling get request to /books'
    })
});

router.post('/', (req, res, next) => {
    const book = new Book({
       _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        authorFirstName: req.body.authorFirstName,
        authorLastName: req.body.authorLastName,
        country: req.body.country,
    });
    book.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'handling post request to /books',
            createdBook: book
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:bookId', (req, res, next) => {
   const id = req.params.bookId;
   Book.findById(id)
       .exec()
       .then(doc => {
           console.log(doc);
           if(doc){
               res.status(200).json(doc);
           } else {
               res.status(404).json({message: 'not found'});
           }
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
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