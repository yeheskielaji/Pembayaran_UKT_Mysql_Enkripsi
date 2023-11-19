const DBConnection = require('./../configs/DBConnection');
const { vigenereDecrypt } = require('../crypto/vigenere');
const { aesDecrypt } = require('../crypto/aes');

const vigenKey = 'kriptoasik'; //key untuk vigenere
const aesKey = 'abcdefghijklmnop'; //key untuk aes

const getPayments = async () => {
    try {
        const rows = await new Promise((resolve, reject) => {
            DBConnection.query('SELECT * FROM payments', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });

        // Proses untuk dekripsi setiap baris data
        const decryptedRows = rows.map((row) => ({
            nim: vigenereDecrypt(aesDecrypt(row.nim, aesKey), vigenKey),
            nama: vigenereDecrypt(aesDecrypt(row.nama, aesKey), vigenKey),
            semester: vigenereDecrypt(aesDecrypt(row.semester, aesKey), vigenKey),
            nominal: vigenereDecrypt(aesDecrypt(row.nominal, aesKey), vigenKey),
            bukti_pembayaran: row.bukti_pembayaran,
            waktu: row.created_at,
        }));

        return decryptedRows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getPayments,
};
