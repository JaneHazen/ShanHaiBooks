const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json({
       message: 'Orders were fetched'
   });
});

router.post('/', (req, res, next) => {
    const review = {
        bookId: req.body.bookId,
        review: req.body.review,
        rating: req.body.rating,
        haveRead: req.body.haveRead
    };
    res.status(201).json({
        message: 'review was created',
        review: review
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