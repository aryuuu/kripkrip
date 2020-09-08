var relativePrime = [1,3,5,7,9,11,15,17,19,21,23,25];

function calculateEncrpyt(id, m, b) {
    mod = m*id + b;
    // while (mod<0) {
    //     mod += 26;
    // }
    return mod%26;
}

function calculateDecrypt(id, m, b) {
    n = 1;
    while ((m*n)%26 != 1) {
        n+=1;
    }
    mod = n*(id-b);
    while (mod<0) {
        mod += 26;
    }
    return mod%26;
}

function encrypt(text, key_b, key_m) {
    if (!key_m) {
        return 'Missing input: key_m';
    }
    key_b = parseInt(key_b);
    key_m = parseInt(key_m);

    if (!(Number.isInteger(key_b) && Number.isInteger(key_m))) {
        return 'Key should be Integer';
        
    }

    if (relativePrime.indexOf(key_m)==-1) {
        return 'key_m should be relative prime number to and less than 26';
    }
    
    text = text.toUpperCase();
    text = text.split(' ').join('');
    encryptedText = '';

    for (var i=0; i<text.length; i++) {
        encryptedText += String.fromCharCode(calculateEncrpyt((text.charCodeAt(i)-65), key_m, key_b) + 65);
    }

    return encryptedText;
}

function decrypt(text, key_b, key_m) {
    if (!key_m) {
        return 'Missing input: key_m';
    }
    key_b = parseInt(key_b);
    key_m = parseInt(key_m);

    if (!(Number.isInteger(key_b) && Number.isInteger(key_m))) {
        return 'Key should be Integer';
    }

    if (relativePrime.indexOf(key_m)==-1) {
        return 'key_m should be relative prime number to and less than 26';
    }
    
    text = text.toUpperCase();
    text = text.split(' ').join('');
    decryptedText = '';

    for (var i=0; i<text.length; i++) {
        decryptedText += String.fromCharCode(calculateDecrypt((text.charCodeAt(i)-65), key_m, key_b) + 65);
    }

    return decryptedText;
}

module.exports = {
    encrypt,
    decrypt
}