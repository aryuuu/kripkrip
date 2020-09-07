/** 
 * matrix 5x5
*/
function createKey(key) {
    key = key.toUpperCase();

    matrices = [];
    
    // extract unique character
    for (var i=0; i < key.length; i++) {
        if (key.charAt(i)=='J') continue;

        if (matrices.indexOf(key.charAt(i))==-1) {
            matrices.push(key.charAt(i));
        }
    }

    // add remaining unique letter except J
    for (var i=0; i < 26; i++) {
        if (String.fromCharCode(i+65)=='J') continue;

        if (matrices.indexOf(String.fromCharCode(i+65))==-1) {
            matrices.push(String.fromCharCode(i+65));
        }
    }

    return matrices;
}

function encrypt(text, key, binary) {
    matricesKey = createKey(key);
    text = text.toUpperCase();
    encryptedText = '';

    // process text
    text = text.split('J').join('I');
    newText = '';
    for (var i=1; i<text.length; i++) {
        if (text.charAt(i-1)==text.charAt(i)) newText += text.charAt(i-1) + 'X';
        else newText += text.charAt(i-1);

        if (i==text.length-1) {
            newText += text.charAt(i);
        }
    }
    if (newText.length%2==1) newText += 'X';
    text = newText;

    // encryption
    for (var i=1; i<text.length; i=i+2) {
        firstLetterIdx = matricesKey.indexOf(text.charAt(i-1));
        secondLetterIdx = matricesKey.indexOf(text.charAt(i));
        
        // check if horizontal
        if (Math.floor(firstLetterIdx/5) == Math.floor(secondLetterIdx/5)) {
            row = Math.floor(firstLetterIdx/5);
            encryptedText += Math.floor((firstLetterIdx+1)/5) == row ? matricesKey[firstLetterIdx+1] : matricesKey[row*5];
            encryptedText += Math.floor((secondLetterIdx+1)/5) == row ? matricesKey[secondLetterIdx+1] : matricesKey[row*5];
        }
        // check if vertical
        else if (firstLetterIdx%5 == secondLetterIdx%5) {
            column = firstLetterIdx%5;
            encryptedText += (firstLetterIdx+5) < 25 ? matricesKey[firstLetterIdx+5] : matricesKey[column];
            encryptedText += (secondLetterIdx+5) < 25 ? matricesKey[secondLetterIdx+5] : matricesKey[column];
        }
        // default
        else {
            // get row of first letter and column of second letter
            firstLetterRow = Math.floor(firstLetterIdx/5);
            firstLetterColumn = firstLetterIdx%5;
            secondLetterRow = Math.floor(secondLetterIdx/5);
            secondLetterColumn = secondLetterIdx%5;

            // first encrypted letter -> M[firstLetterRow][secondLetterColumn]
            encryptedText += matricesKey[firstLetterRow*5 + secondLetterColumn];
            // second encrypted letter -> M[secondLetterRow][firstLetterColumn]
            encryptedText += matricesKey[secondLetterRow*5 + firstLetterColumn];
        }
    }

    return encryptedText;
}

function decrypt(text, key, binary) {
    matricesKey = createKey(key);
    text = text.toUpperCase();
    decryptedText = '';

    // decrypt
    for (var i=1; i<text.length; i=i+2) {
        firstLetterIdx = matricesKey.indexOf(text.charAt(i-1));
        secondLetterIdx = matricesKey.indexOf(text.charAt(i));
        
        // check if horizontal
        if (Math.floor(firstLetterIdx/5) == Math.floor(secondLetterIdx/5)) {
            row = Math.floor(firstLetterIdx/5);
            decryptedText += Math.floor((firstLetterIdx-1)/5) == row ? matricesKey[firstLetterIdx-1] : matricesKey[row*5+4];
            decryptedText += Math.floor((secondLetterIdx-1)/5) == row ? matricesKey[secondLetterIdx-1] : matricesKey[row*5+4];
        }
        // check if vertical
        else if (firstLetterIdx%5 == secondLetterIdx%5) {
            column = firstLetterIdx%5;
            decryptedText += (firstLetterIdx-5) >= 0 ? matricesKey[firstLetterIdx-5] : matricesKey[4*5+column];
            decryptedText += (secondLetterIdx-5) >= 0 ? matricesKey[secondLetterIdx-5] : matricesKey[4*5+column];
        }
        // default
        else {
            // get row and column of first and second letter
            firstLetterRow = Math.floor(firstLetterIdx/5);
            firstLetterColumn = firstLetterIdx%5;
            secondLetterRow = Math.floor(secondLetterIdx/5);
            secondLetterColumn = secondLetterIdx%5;

            // first decrypted letter -> M[firstLetterRow][secondLetterColumn]
            decryptedText += matricesKey[firstLetterRow*5 + secondLetterColumn];
            // second decrypted letter -> M[secondLetterRow][firstLetterColumn]
            decryptedText += matricesKey[secondLetterRow*5 + firstLetterColumn];
        }
    }

    // process text
    // remove X at the end if exist
    if (decryptedText.charAt(decryptedText.length-1)=='X') decryptedText = decryptedText.slice(0,decryptedText.length-1);
    // remove X between 2 identical letter
    processedText = decryptedText.slice(0,1);
    for (var i=1; i<decryptedText.length-1; i++) {
        if (decryptedText.charAt(i)=='X' && decryptedText.charAt(i-1)==decryptedText.charAt(i+1)) {
            continue;
        }
        
        processedText += decryptedText.charAt(i);
    }
    processedText += decryptedText.charAt(decryptedText.length-1);

    return processedText;

}

module.exports = {
    encrypt,
    decrypt
}

