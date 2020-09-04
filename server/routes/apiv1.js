const express = require('express');
const r = express.Router();

const { checkInputCompleteness } = require('../middlewares/validator');

r.get('/test', (req, res) => {
  res.send({ message: 'bite my shiny metal ass'});
})
r.post('/vigenere/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/vigenere/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/full-vigenere/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/full-vigenere/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/running-vigenere/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/running-vigenere/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/ext-vigenere/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/ext-vigenere/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/playfair/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/playfair/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/super/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/super/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/affine/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/affine/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/hill/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/hill/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/enigma/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/enigma/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});


module.exports = r;