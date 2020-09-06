const express = require('express');
const r = express.Router();

const { checkInputCompleteness } = require('../middlewares/validator');

r.post('/test', (req, res) => {
  res.send({ message: req.body.plain });
})
r.post('/vigenere/enc', checkInputCompleteness, (req, res) => {
  const { encrypt } = require('../cipher/vigenere');
  encryptedText = encrypt(req.body.plain, req.body.key, false);
  res.send({ message: encryptedText });
});
r.post('/vigenere/dec', checkInputCompleteness, (req, res) => {
  const { decrypt } = require('../cipher/vigenere');
  decryptedText = decrypt(req.body.chiper, req.body.key, false);
  res.send({ message: decryptedText });
});
r.post('/full-vigenere/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/full-vigenere/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/auto-key-vigenere/enc', checkInputCompleteness, (req, res) => {
  const { encryptAutoKey } = require('../cipher/vigenere');
  encryptedText = encryptAutoKey(req.body.plain, req.body.key, false);
  res.send({ message: encryptedText });
});
r.post('/auto-key-vigenere/dec', checkInputCompleteness, (req, res) => {
  const { decryptAutoKey } = require('../cipher/vigenere');
  decryptedText = decryptAutoKey(req.body.cipher, req.body.key, false);
  res.send({ message: decryptedText });
});
r.post('/ext-vigenere/enc', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/ext-vigenere/dec', checkInputCompleteness, (req, res) => {
  res.send({ message: 'bite my shiny metal ass' });
});
r.post('/playfair/enc', checkInputCompleteness, (req, res) => {
  const { encrypt } = require('../cipher/playfair');
  cipherText = encrypt(req.body.plain, req.body.key, false);
  res.send({ message: cipherText });
});
r.post('/playfair/dec', checkInputCompleteness, (req, res) => {
  const { decrypt } = require('../cipher/playfair');
  plainText = decrypt(req.body.cipher, req.body.key, false);
  res.send({ message: plainText });
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