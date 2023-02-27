const express = require('express');
require('./database/mongoose')
const main = require('../../api/routers/main');
const admin = require('../../api/routers/admin');

const app = express();
app.use(express.json());

// Remove CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Add service prefix to every endpoint
app.use('/interoperability/api', main);
app.use('/interoperability/api', admin);

module.exports = app;
