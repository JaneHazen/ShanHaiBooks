const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/review');
const Book = require('../models/book');

router.get('/', (req, res, next) => {
   Review.find()
       .exec()
       .select('_id review rating haveRead book')
       .then(docs => {
           res.status(200).json({
               count: docs.length,
               reviews: docs.map(doc => {
                   return {
                       _id: doc._id,
                       review: doc.review,
                       rating: doc.rating,
                       haveRead: doc.haveRead,
                       book: doc.book,
                       request: {
                           type: "GET",
                           url: 'http://localhost:3000/orders/' + doc._id
                       }
                   }
               })
           });
       })
       .catch(err => {
           res.status(500).json({error: err});
       });
});

router.post('/', (req, res, next) => {
    Book.findById(req.body.bookId)
        .then(book => {
            if(!book){
                return res.status(404).json({message: 'Book not found'});
            }
            const review = new Review({
                _id: mongoose.Types.ObjectId(),
                review: req.body.review,
                rating: req.body.rating,
                haveRead: req.body.haveRead,
                book: req.body.bookId
            });
            return review
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Review stored',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/reviews/' + result._id,
                },
                createdReview: {
                    _id: result._id,
                    review: result.review,
                    rating: result.rating,
                    haveRead: result.haveRead,
                    book: result.book,
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});

router.get('/:reviewId', (req, res, next) => {
    res.status(200).json({
        message: 'order details',
        reviewId: req.params.reviewId
    });
});

router.delete('/:reviewId', (req, res, next) => {
    res.status(200).json({
        message: 'order deleted details',
        reviewId: req.params.reviewId
    });
});



module.exports = router;