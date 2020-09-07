math = require('mathjs');

function createMatrixKey(m, arr) {
    number = arr.split(' ');
    m = parseInt(m);
    if (number.length!=m*m) return false;

    matrices = [];
    for(var i=0; i<m; i++) {
        rows = [];
        for(var j=0; j<m; j++) {
            rows.push(parseInt(number[i*m + j]));
        }
        matrices.push(rows);
    }

    return matrices;
}

function encrypt(text, m, arr) {
    m = parseInt(m);
    if (m!=2 && m!=3) return 'm should be 2 or 3';

    matrices = createMatrixKey(m, trim(arr));
    if (!matrices) return 'matrices format incompleted';
    det = math.mod(math.det(math.matrix(matrices)),26);
    // check can be inversed or not
    if (math.gcd(det,26)!=1) return 'Determinant = '+det+' : There is no modular multiplicative inverse for this integer';

    text = text.toUpperCase();
    mod = text.length%m;

    for (var x=0;x<m-mod;x++) {
        text += 'Z';
    }
    encryptedText = '';

    for(var i=0; i<text.length-1; i+=m) {
        
        matP = [];
        for (var j=i; j<m+i; j++) {
            matP.push(parseInt(text.charCodeAt(j)-65));
        }

        result = math.transpose(math.mod(math.multiply(matrices,math.transpose([matP])),26));
        for (var k=0; k<m; k++) {
            encryptedText += String.fromCharCode(math.subset(result,math.index(0,k))+65);
        }
    }

    return encryptedText;
}

function decrypt(text, m, arr) {
    m = parseInt(m);
    if (m!=2 && m!=3) return 'm should be 2 or 3';

    matrices = createMatrixKey(m, trim(arr));
    if (!matrices) return 'matrices format incompleted';
    det = math.mod(math.det(math.matrix(matrices)),26);

    if (math.gcd(det,26)!=1) return 'Determinant = '+det+' : There is no modular multiplicative inverse for this integer';
    
    n = 1;
    while(det*n%26!=1) {
        n++;
    }

    // inverse matrix
    if (m==2) {
        comatrix = [[matrices[1][1],-1*matrices[0][1]],[-1*matrices[1][0],matrices[0][0]]];
        comatrix = math.mod(comatrix,26);
        matrices = math.mod(math.multiply(n, comatrix),26);

    }
    else if (m==3) {
        comatrix = [];
       
        for (var i=0; i<m; i++) {
            rows = [];
            for (var j=0;j<m; j++) {
                m1 = parseInt(matrices[math.mod(i+1,m)][math.mod(j+1,m)]*matrices[math.mod(i+2,m)][math.mod(j+2,m)]);
                m2 = parseInt(matrices[math.mod(i+1,m)][math.mod(j+2,m)]*matrices[math.mod(i+2,m)][math.mod(j+1,m)]);
                
                rows.push(m1-m2);
            }
            comatrix.push(rows);
        }
        
        comatrix = math.transpose(math.mod(comatrix,26));
        matrices = math.mod(math.multiply(n, comatrix),26);
    }
    
    decryptedText = '';

    for(var i=0; i<text.length-1; i+=m) {
        
        matP = [];
        for (var j=i; j<m+i; j++) {
            matP.push(parseInt(text.charCodeAt(j)-65));
        }

        result = math.transpose(math.mod(math.multiply(matrices,math.transpose([matP])),26));
        for (var k=0; k<m; k++) {
            decryptedText += String.fromCharCode(math.subset(result,math.index(0,k))+65);
        }
        
    }

    // if (decryptedText.substr(decryptedText.length-2) == 'ZZ') decryptedText = decryptedText.substr(0,decryptedText.length-2);
    // else if (decryptedText.substr(decryptedText.length-1) == 'Z') decryptedText = decryptedText.substr(0,decryptedText.length-1);

    return decryptedText;
}

module.exports = {
    encrypt,
    decrypt
}