var r1 = ['E','K','M','F','L','G','D','Q','V','Z','N','T','O','W','Y','H','X','U','S','P','A','I','B','R','C','J'];
var r2 = ['A','J','D','K','S','I','R','U','X','B','L','H','W','T','M','C','Q','G','Z','N','P','Y','F','V','O','E'];
var r3 = ['B','D','F','H','J','L','C','P','R','T','X','V','Z','N','Y','E','I','W','G','A','K','M','U','S','Q','O'];
var r4 = ['E','S','O','V','P','Z','J','A','Y','Q','U','I','R','H','X','L','N','F','T','G','K','D','C','M','W','B'];
var r5 = ['V','Z','B','R','G','I','T','Y','U','P','S','D','N','H','L','X','A','W','M','J','Q','O','F','E','C','K'];
var r6 = ['J','P','G','V','O','U','M','F','Y','Q','B','E','N','H','Z','R','D','K','A','S','X','L','I','C','T','W'];
var r7 = ['N','Z','J','H','G','R','C','X','M','Y','S','W','B','O','U','F','A','I','V','L','P','E','K','Q','D','T'];
var r8 = ['F','K','Q','H','T','L','X','O','C','B','J','S','P','D','Z','R','A','M','E','W','N','I','U','Y','G','V'];
var rotorList = [r1, r2, r3, r4, r5, r6, r7, r8];

function rotateRotor(rotor) {
    newRotor = [rotor[25]];
    for (var i=0;i<25;i++) {
        newRotor.push(rotor[i]);
    }

    return newRotor;
}


function encrypt(text, key) {
    // cek input format
    key = key.split(' ');
    if (key.length != 3) return 'Wrong input format';
    for (var i=0; i<3; i++) {
        if (parseInt(key[i])>8 || parseInt(key[i])<1) return 'Wrong input format';
    }

    text = text.toUpperCase();
    text = text.split(' ').join('');

    rotor2Counter = 0; rotor3Counter = 0;
    ring1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    ring2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    ring3 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    rotor1 = rotorList[parseInt(parseInt(key[0]))-1];
    rotor2 = rotorList[parseInt(parseInt(key[1]))-1];
    rotor3 = rotorList[parseInt(parseInt(key[2]))-1];

    text = text.toUpperCase();
    encryptedText = '';

    for (var i=0; i<text.length; i++) {
        // rotor 1
        idx1 = ring1.indexOf(text.charAt(i));
        ec1 = rotor1[idx1];

        // rotor 2
        idx2 = ring2.indexOf(ec1);
        ec2 = rotor2[idx2];

        // rotor 3
        idx3 = ring3.indexOf(ec2);
        ec3 = rotor3[idx3];

        // add to encrypted text
        encryptedText += ec3;

        // rotate rotor
        ring3 = rotateRotor(ring3);
        rotor3 = rotateRotor(rotor3);
        rotor3Counter++;

        if (rotor3Counter>25) {
            rotor3Counter = 0;
            ring2 = rotateRotor(ring2);
            rotor2 = rotateRotor(rotor2);
            rotor2Counter++;
        }

        if (rotor2Counter>25) {
            rotor2Counter = 0;
            ring1 = rotateRotor(ring1);
            rotor1 = rotateRotor(rotor1);
        }

    }

    return encryptedText;
}

function decrypt(text, key) {
    key = key.split(' ');
    if (key.length != 3) return 'Wrong input format';
    for (var i=0; i<3; i++) {
        if (parseInt(key[i])>8 || parseInt(key[i])<1) return 'Wrong input format';
    }

    text = text.toUpperCase();
    text = text.split(' ').join('');

    rotor2Counter = 0; rotor3Counter = 0;
    ring1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    ring2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    ring3 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    rotor1 = rotorList[parseInt(parseInt(key[0]))-1];
    rotor2 = rotorList[parseInt(parseInt(key[1]))-1];
    rotor3 = rotorList[parseInt(parseInt(key[2]))-1];

    text = text.toUpperCase();
    decryptedText = '';

    for (var i=0; i<text.length; i++) {
        idx3 = rotor3.indexOf(text.charAt(i));
        dc3 = ring3[idx3];

        idx2 = rotor2.indexOf(dc3);
        dc2 = ring2[idx2];

        idx1 = rotor1.indexOf(dc2);
        dc1 = ring1[idx1];

        // add to decrypted text
        decryptedText += dc1;

        // rotate rotor
        ring3 = rotateRotor(ring3);
        rotor3 = rotateRotor(rotor3);
        rotor3Counter++;

        if (rotor3Counter>25) {
            rotor3Counter = 0;
            ring2 = rotateRotor(ring2);
            rotor2 = rotateRotor(rotor2);
            rotor2Counter++;
        }

        if (rotor2Counter>25) {
            rotor2Counter = 0;
            ring1 = rotateRotor(ring1);
            rotor1 = rotateRotor(rotor1);
        }
    }

    return decryptedText;
}

module.exports = {
    encrypt,
    decrypt
}