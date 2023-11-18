import crypto from "crypto";

//fungsi enkripsi AES
function aesEncrypt(text, key) {
    const iv = '1234567890123456';
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        encryptedData: encrypted,
    };
}

//fungsi dekripsi AES
function aesDecrypt(encryptedData, key) {
    const iv = '1234567890123456';
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = {
    aesEncrypt: aesEncrypt,
    aesDecrypt: aesDecrypt,
};


// const crypto = require('crypto');

// const cryptoAlgorithm = 'aes-128-cbc';
// const key = 'abcdefghijklmnop';
// const iv = '1234567890123456';

// let data = 'Halo semuanya. Ini adalah pesan yang ingin dikirimkan.'

// const dataCrypto = crypto.createCipheriv(cryptoAlgorithm, key, iv);
// let dataCipher = dataCrypto.update(data, 'utf8', 'hex');
// dataCipher += dataCrypto.final('hex');

// console.log(dataCipher);

// //---------------
// console.log('---decrypted---');

// const dataDecipher = crypto.createDecipheriv(cryptoAlgorithm, key, iv);
// let decryptedData = dataDecipher.update(dataCipher, 'hex', 'utf8');
// decryptedData += dataDecipher.final('utf8');

// console.log(decryptedData);