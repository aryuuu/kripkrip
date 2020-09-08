const express = require('express');
const multer = require('multer');
const r = express.Router();

const upload = multer();

const { checkInputCompleteness } = require('../middlewares/validator');

r.post('/test', (req, res) => {
  res.send({ message: req.body.plain });
})

r.post('/vigenere/enc', checkInputCompleteness, (req, res) => {
  const { encrypt } = require('../cipher/vigenere');
  encryptedText = encrypt(req.body.plain, req.body.key);
  res.send({ message: encryptedText });
});

r.post('/vigenere/dec', checkInputCompleteness, (req, res) => {
  const { decrypt } = require('../cipher/vigenere');
  decryptedText = decrypt(req.body.cipher, req.body.key);
  res.send({ message: decryptedText });
});

r.post('/full-vigenere/enc', checkInputCompleteness, (req, res) => {
  const { encryptFull } = require('../cipher/vigenere');
  const { body } = req;
  if (!body.alphaTable) {
    return res.status(400).json({ message: 'Missing alphabet table' });
  }

  let cipherText = encryptFull(body.plain, body.key, body.alphaTable);

  res.send({ message: cipherText });
});

r.post('/full-vigenere/dec', checkInputCompleteness, (req, res) => {
  const { decryptFull } = require('../cipher/vigenere');
  const { body } = req;
  if (!body.alphaTable) {
    return res.status(400).json({ message: 'Missing alphabet table' });
  }
  let plainText = decryptFull(body.cipher, body.key, body.alphaTable);

  res.send({ message: plainText });
});

r.post('/auto-key-vigenere/enc', checkInputCompleteness, (req, res) => {
  const { encryptAutoKey } = require('../cipher/vigenere');
  encryptedText = encryptAutoKey(req.body.plain, req.body.key);
  res.send({ message: encryptedText });
});

r.post('/auto-key-vigenere/dec', checkInputCompleteness, (req, res) => {
  const { decryptAutoKey } = require('../cipher/vigenere');
  decryptedText = decryptAutoKey(req.body.cipher, req.body.key);
  res.send({ message: decryptedText });
});

r.post('/extended-vigenere/enc', checkInputCompleteness, (req, res) => {
  const { encryptExtended } = require('../cipher/vigenere');
  const { body } = req;

  let cipherText = encryptExtended(body.plain, body.key, false);

  res.send({ message: cipherText });
});

r.post('/extended-vigenere/dec', checkInputCompleteness, (req, res) => {
  const { decryptExtended } = require('../cipher/vigenere');
  const { body } = req;

  let plainText = decryptExtended(body.cipher, body.key, false);

  res.send({ message: plainText });
});

r.post('/extended-vigenere/file/enc', upload.single('file'), (req, res) => {
  console.log(JSON.stringify(req.file));
  console.log(req.body);
  res.send({ message: 'bite my shiny metal ass' });
});

r.post('/extended-vigenere/file/dec', upload.single('file'), (req, res) => {
  console.log(JSON.stringify(req.file));
  console.log(req.body);
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

r.post('/super-enkripsi/enc', checkInputCompleteness, (req, res) => {
  const { encrypt } = require('../cipher/super');
  const { body } = req;
  if (!body.alphaTable || body.alphaTable.length !== 26) {
    return res.status(400).json({ message: 'Missing alphabet table' });
  }

  let cipherText = encrypt(body.plain, body.key, body.alphaTable);

  res.send({ message: cipherText });
});

r.post('/super-enkripsi/dec', checkInputCompleteness, (req, res) => {
  const { decrypt } = require('../cipher/super');
  const { body } = req;
  if (!body.alphaTable || body.alphaTable.length !== 26) {
    return res.status(400).json({ message: 'Missing alphabet table' });
  }

  let plainText = decrypt(body.cipher, body.key, body.alphaTable);

  res.send({ message: plainText });
});

r.post('/affine/enc', checkInputCompleteness, (req, res) => {
  const { encrypt } = require('../cipher/affine');
  cipherText = encrypt(req.body.plain, req.body.key, req.body.key_m);
  res.send({ message: cipherText });
});

r.post('/affine/dec', checkInputCompleteness, (req, res) => {
  const { decrypt } = require('../cipher/affine');
  plainText = decrypt(req.body.cipher, req.body.key, req.body.key_m);
  res.send({ message: plainText });
});

r.post('/hill/enc', checkInputCompleteness, (req, res) => {
  const { encrypt } = require('../cipher/hill');
  cipherText = encrypt(req.body.plain, req.body.key, req.body.key_matrix);
  res.send({ message: cipherText });
});

r.post('/hill/dec', checkInputCompleteness, (req, res) => {
  const { decrypt } = require('../cipher/hill');
  plainText = decrypt(req.body.cipher, req.body.key, req.body.key_matrix);
  res.send({ message: plainText });
});

r.post('/enigma/enc', checkInputCompleteness, (req, res) => {
  const { encrypt } = require('../cipher/enigma');
  cipherText = encrypt(req.body.plain, req.body.key);
  res.send({ message: cipherText });
});

r.post('/enigma/dec', checkInputCompleteness, (req, res) => {
  const { decrypt } = require('../cipher/enigma');
  plainText = decrypt(req.body.cipher, req.body.key);
  res.send({ message: plainText });
});


module.exports = r;