import DBConnection from './../configs/DBConnection';
import { vigenereEncrypt } from '../crypto/vigenere';
import { aesEncrypt } from '../crypto/aes';
const crypto = require('crypto');

const vigenKey = 'kriptoasik'; //key untuk vigenere
const aesKey = 'abcdefghijklmnop'; //key untuk aes

let processPayment = (paymentData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isPaymentExist = await checkExistingPayment(paymentData.nim, paymentData.semester);
            if (isPaymentExist) {
                console.log("Processing Payment Data...");
                reject(`Nim ${paymentData.nim} telah melakukan pembayaran pada semester ${paymentData.semester}`);
            } else {
                // Mengenkripsi data dengan Vigenère Cipher
                const vigenereEncryptedPaymentData = {
                    nim: vigenereEncrypt(paymentData.nim, vigenKey),
                    nama: vigenereEncrypt(paymentData.nama, vigenKey),
                    semester: vigenereEncrypt(paymentData.semester, vigenKey),
                    nominal: vigenereEncrypt(paymentData.nominal.toString(), vigenKey),
                };

                // Mengenkripsi data hasil Vigenère Cipher dengan AES
                const aesEncryptedPaymentData = {
                    nim: aesEncrypt(vigenereEncryptedPaymentData.nim, aesKey).encryptedData,
                    nama: aesEncrypt(vigenereEncryptedPaymentData.nama, aesKey).encryptedData,
                    semester: aesEncrypt(vigenereEncryptedPaymentData.semester, aesKey).encryptedData,
                    nominal: aesEncrypt(vigenereEncryptedPaymentData.nominal, aesKey).encryptedData,
                    bukti_pembayaran: (paymentData.bukti_pembayaran),
                };

                // Proses pembayaran dan simpan ke database
                DBConnection.query(
                    'INSERT INTO payments SET ?', aesEncryptedPaymentData,
                    function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        resolve('Pembayaran berhasil diproses dan disimpan');
                    }
                );
            }
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
};

let checkExistingPayment = (nim, semester) => {
    return new Promise((resolve, reject) => {
        try {
            // Mengenkripsi data dengan Vigenère Cipher
            const vigenereNimSemester = {
                nim: vigenereEncrypt(nim, vigenKey),
                semester: vigenereEncrypt(semester, vigenKey),
            };

            // Mengenkripsi data hasil Vigenère Cipher dengan AES
            const aesNimSemester = {
                nim: aesEncrypt(vigenereNimSemester.nim, aesKey).encryptedData,
                semester: aesEncrypt(vigenereNimSemester.semester, aesKey).encryptedData,
            };

            DBConnection.query(
                'SELECT * FROM `payments` WHERE `nim` = ? AND `semester` = ?', [aesNimSemester.nim, aesNimSemester.semester],
                function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    if (rows.length > 0) {
                        resolve(true); // Pembayaran sudah ada untuk nim dan semester yang sama
                    } else {
                        resolve(false); // Pembayaran belum ada untuk nim dan semester yang sama
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    processPayment: processPayment,
};

