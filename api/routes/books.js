const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Book = require('../models/book');

router.get('/', (req, res, next) => {
    Book.find()
        .select('title authorFirstName authorLastname country _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                books: docs.map(doc => {
                    return {
                        title: doc.title,
                        authorFirstName: doc.authorFirstName,
                        authorLastName: doc.authorLastName,
                        id: doc._id,
                        country: doc.country,
                        request:{
                            type: "GET",
                            url: "http://localhost:4000/books/" + doc._id
                        }
                    }
                })
            };
            console.log(docs);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.get('/:country', (req, res, next) => {
    const country = req.params.country;
    Book.find()
        .select('title authorFirstName authorLastname country _id')
        .where('country', country)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                books: docs.map(doc => {
                    return {
                        title: doc.title,
                        authorFirstName: doc.authorFirstName,
                        authorLastName: doc.authorLastName,
                        id: doc._id,
                        country: doc.country,
                        request:{
                            type: "GET",
                            url: "http://localhost:4000/books/" + doc._id
                        }
                    }
                })
            };
            console.log(docs);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.post('/', checkAuth, (req, res, next) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        authorFirstName: req.body.authorFirstName,
        authorLastName: req.body.authorLastName,
        country: req.body.country,
    });
    book
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'handling post request to /books',
            createdBook: {
                title: result.title,
                authorFirstName: result.authorFirstName,
                authorLastName: result.authorLastName,
                country: result.country,
                id: result._id,
                request: {
                    type: "GET",
                    url: "http://localhost:4000/books/" + result._id
                }
            }
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
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Book.update({ _id: id }, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    Book.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;