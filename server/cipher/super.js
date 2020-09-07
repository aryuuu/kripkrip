const encrypt = (text, key, alphaTable) => {
  key = key.toUpperCase();
  text = text.toUpperCase();

  let keyCounter = 0;
  let result = '';

  while (text.length > 0) {
    if (text.charCodeAt(0) >= 65 && text.charCodeAt(0) <= 90) { // skip non alphabet char
      if (keyCounter >= key.length) keyCounter = 0;

      let encryptedLetter = text.charCodeAt(0) + (key.charCodeAt(keyCounter) - 65);

      // cipher substitusi
      let idx = (encryptedLetter - 65) % 26;

      result += alphaTable.charAt(idx);

      keyCounter += 1;

    }
    text = text.slice(1);
  }
  return result;

}

const decrypt = (text, key, alphaTable) => {
  key = key.toUpperCase();
  text = text.toUpperCase();

  let keyCounter = 0;
  let decryptedText = '';

  while (text.length != 0) {
    if (text.charCodeAt(0) >= 60 && text.charCodeAt(0) <= 90) {
      if (keyCounter >= key.length) keyCounter = 0;

      // cipher substitusi
      let idx = alphaTable.indexOf(text.charAt(0));
      let temp = String.fromCharCode(idx + 65);

      let decryptedLetter = temp.charCodeAt(0) - (key.charCodeAt(keyCounter) - 65);
      if (decryptedLetter >= 65) decryptedLetter = (decryptedLetter - 65) % 26 + 65;
      else decryptedLetter = (decryptedLetter + 26 - 65) % 26 + 65;

      decryptedText += String.fromCharCode(decryptedLetter);

      keyCounter += 1;
    }
    text = text.slice(1);
  }

  return decryptedText;
}

module.exports = {
  encrypt,
  decrypt
}
