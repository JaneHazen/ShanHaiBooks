const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/review');

router.get('/', (req, res, next) => {
   Review.find()
       .exec()
       .then(docs => {
           res.status(200).json(docs);
       })
       .catch(err => {
           res.status(500).json({error: err});
       });
});

router.post('/', (req, res, next) => {
    const review = new Review({
        _id: mongoose.Types.ObjectId(),
        review: req.body.review,
        rating: req.body.rating,
        haveRead: req.body.haveRead,
        book: req.body.bookId
    });
    review
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                result
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