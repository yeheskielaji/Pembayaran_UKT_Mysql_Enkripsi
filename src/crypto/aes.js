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