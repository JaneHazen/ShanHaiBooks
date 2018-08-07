const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/user');

const envVariables = require('../private');
mongoose.connect('mongodb://shanhai:' + envVariables.env.MONGO_ATLAS_PW + '@shanhai-shard-00-00-nqztf.mongodb.net:27017,shanhai-shard-00-01-nqztf.mongodb.net:27017,shanhai-shard-00-02-nqztf.mongodb.net:27017/test?ssl=true&replicaSet=shanhai-shard-0&authSource=admin&retryWrites=true');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   });
});

module.exports = app;