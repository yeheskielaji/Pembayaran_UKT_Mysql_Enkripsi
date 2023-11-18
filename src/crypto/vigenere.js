// Fungsi untuk mengenkripsi menggunakan Vigenère Cipher
const vigenereEncrypt = (message, key) => {
    message = message.toUpperCase();
    key = key.toUpperCase();
    let encryptedText = '';

    for (let i = 0, j = 0; i < message.length; i++) {
        const currentChar = message.charCodeAt(i);
        if (currentChar < 65 || currentChar > 90) {
            // Jika karakter bukan huruf A-Z, lewati karakter ini
            encryptedText += message.charAt(i);
            continue;
        }

        encryptedText += String.fromCharCode(((currentChar + key.charCodeAt(j) - 2 * 65) % 26) + 65);
        j = ++j % key.length;
    }
    return encryptedText;
};

const vigenereDecrypt = (encryptedText, key) => {
    encryptedText = encryptedText.toUpperCase();
    key = key.toUpperCase();
    let decryptedText = '';

    for (let i = 0, j = 0; i < encryptedText.length; i++) {
        const currentChar = encryptedText.charCodeAt(i);
        if (currentChar < 65 || currentChar > 90) {
            // Jika karakter bukan huruf A-Z, lewati karakter ini
            decryptedText += encryptedText.charAt(i);
            continue;
        }

        decryptedText += String.fromCharCode(((currentChar - key.charCodeAt(j) + 26) % 26) + 65);
        j = ++j % key.length;
    }
    return decryptedText;
};

module.exports = {
    vigenereEncrypt: vigenereEncrypt,
    vigenereDecrypt: vigenereDecrypt,
};