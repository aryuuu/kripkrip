/**
 * Standard vigenere. All text convert to upper case
 * A = 65
 * Z = 90
 * @param {*} text 
 * @param {*} key 
 * @param {boolean} binary 
 */
function encrypt(text, key, binary) {
  key = key.toUpperCase();
  if (!binary) text = text.toUpperCase();

  keyCounter = 0;
  encryptedText = '';

  while (text.length != 0) {
    if (keyCounter >= key.length) keyCounter = 0;

    encryptedLetter = text.charCodeAt(0) + (key.charCodeAt(keyCounter) - 65);
    if (!binary) encryptedLetter = (encryptedLetter - 65) % 26 + 65;

    encryptedText += String.fromCharCode(encryptedLetter);

    text = text.slice(1);
    keyCounter += 1;
  }
  return encryptedText;

}

function decrypt(text, key, binary) {
  key = key.toUpperCase();
  if (!binary) text = text.toUpperCase();

  keyCounter = 0;
  decryptedText = '';

  while (text.length != 0) {
    if (keyCounter >= key.length) keyCounter = 0;

    decryptedLetter = text.charCodeAt(0) - (key.charCodeAt(keyCounter) - 65);
    if (!binary && decryptedLetter >= 65) decryptedLetter = (decryptedLetter - 65) % 26 + 65;
    else if (!binary) decryptedLetter = (decryptedLetter + 26 - 65) % 26 + 65;

    decryptedText += String.fromCharCode(decryptedLetter);

    text = text.slice(1);
    keyCounter += 1;
  }

  return decryptedText;
}

/**
 * Auto-key vigenere. All text convert to upper case
 * A = 65
 * Z = 90
 * @param {*} text 
 * @param {*} key 
 * @param {boolean} binary 
 */
function encryptAutoKey(text, key, binary) {
  key = key.toUpperCase();
  if (!binary) text = text.toUpperCase();

  if (key.length < text.length) key += text.slice(0, (text.length - key.length));

  keyCounter = 0;
  encryptedText = '';

  while (text.length != 0) {

    encryptedLetter = text.charCodeAt(0) + (key.charCodeAt(keyCounter) - 65);
    if (!binary) encryptedLetter = (encryptedLetter - 65) % 26 + 65;

    encryptedText += String.fromCharCode(encryptedLetter);

    text = text.slice(1);
    keyCounter += 1;
  }
  return encryptedText;
}

function decryptAutoKey(text, key, binary) {
  key = key.toUpperCase();
  if (!binary) text = text.toUpperCase();

  keyCounter = 0;
  keyFromPlainText = false;
  decryptedText = '';

  while (text.length != 0) {
    if (keyCounter >= key.length && !keyFromPlainText) {
      keyFromPlainText = true;
      keyCounter = 0;
    }

    if (!keyFromPlainText) decryptedLetter = text.charCodeAt(0) - (key.charCodeAt(keyCounter) - 65);
    else decryptedLetter = text.charCodeAt(0) - (decryptedText.charCodeAt(keyCounter) - 65);

    if (!binary && decryptedLetter >= 65) decryptedLetter = (decryptedLetter - 65) % 26 + 65;
    else if (!binary) decryptedLetter = (decryptedLetter + 26 - 65) % 26 + 65;

    decryptedText += String.fromCharCode(decryptedLetter);

    text = text.slice(1);
    keyCounter += 1;
  }

  return decryptedText;
}

const encryptFull = (text, key, alphaTable) => {
  text = text.toUpperCase();
  key = key.toUpperCase();
  alphaTable = alphaTable.toUpperCase();

  alphaTable = alphaTable.split(',');
  alphaTable = alphaTable.map(e => e.split(''));

  let keyCounter = 0;
  let result = '';

  while (text.length > 0) {
    if (text.charCodeAt(0) >= 60 && text.charCodeAt(0) <= 90) {
      if (keyCounter >= key.length) keyCounter = 0;

      let i = key.charCodeAt(keyCounter) - 65;
      let j = text.charCodeAt(0) - 65;

      result += alphaTable[i][j];
      keyCounter++;

    }
    text = text.slice(1);
  }
  return result;
}

const decryptFull = (text, key, alphaTable) => {
  text = text.toUpperCase();
  key = key.toUpperCase();
  alphaTable = alphaTable.toUpperCase();

  alphaTable = alphaTable.split(',');
  alphaTable = alphaTable.map(e => e.split(''));

  let keyCounter = 0;
  let result = '';

  while (text.length > 0) {
    if (text.charCodeAt(0) >= 65 && text.charCodeAt(0) <= 90) {
      if (keyCounter >= key.length) keyCounter = 0;
      
      let i = key.charCodeAt(keyCounter) - 65;
      let j = 0;
      while (alphaTable[i][j] !== text.charAt(0)) {
        j++;
      }

      result += String.fromCharCode(j+65);

      keyCounter++;
    }
    text = text.slice(1);
  }

  return result;
}

const encryptExtended = (stream, key, binary) => {

}

const decryptExtended = (stream, key, binary) => {

}

module.exports = {

  encrypt,
  decrypt,
  encryptAutoKey,
  decryptAutoKey,
  encryptFull,
  decryptFull,
  encryptExtended,
  decryptExtended

};