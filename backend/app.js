require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { ValidationError } = require('sequelize');

const routes = require('./routes');
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// body parsers
app.use(express.json())

// cors
app.use(cors({
    origin: isProduction ? "https://commerce-7oxpz5yp3-jerrendangs-projects.vercel.app":"http://localhost:3000",
    credentials: true,
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

// client cookie parser
app.use(cookieParser());

// routes
app.use(routes);

// error handling
app.use((req, res, next) => { // route not found
    const err = new Error('The requested resource could not be found');
    err.title = 'Resource Not Found';
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => { // invalid validation with sequelize
    if (err instanceof ValidationError){
        err.errors = err.errors.map(e => e.message);
        err.title = 'Validation error';
    }   
    next(err) 
})

app.use((err, req, res, next) => { // sending error
    res.status(err.status || 500);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    })
})
// error handling

module.exports = app;