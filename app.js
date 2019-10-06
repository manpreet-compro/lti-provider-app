"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || config.port;

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ 'extended': true }));

app.use(`/`, routes);

app.listen(port,()=>{
    console.log(`Provider listening on port ${port}`);
})
module.exports = app;
