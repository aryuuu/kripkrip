const express = require('express');
const r = express.Router();

r.get('/test', (req, res) => {
  res.send({ message: 'bite my shiny metal ass'});
})
// r.get('/vigenere', (req, res) => {

// });

module.exports.router = r;