const express = require('express');

const api = require('./api');

const db = require('./db');

const cors = require('cors');

db.init();

const app = express();

app.use(cors({ "origin": "*" }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'IPV6 Grabber API',
  });
});

app.use('/api/v1', api);

module.exports = app;