import DBConnection from './../configs/DBConnection';

let processPayment = (paymentData) => {
    return new Promise(async (resolve, reject) => {
        let isPaymentExit = await checkExistingPayment(paymentData.nim, paymentData.semester);
        if (isPaymentExit) {
            console.log("Processing Payment Data...");
            reject(`Nim ${paymentData.nim} telah melakukan pembayaran pada semester ${paymentData.semester}`);
        } else {
            // Proses pembayaran dan simpan ke database
            DBConnection.query(
                'INSERT INTO payments SET ?', paymentData,
                function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve('Pembayaran berhasil diproses dan disimpan');
                }
            );
        }
    });
};

let checkExistingPayment = (nim, semester) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                'SELECT * FROM `payments` WHERE `nim` = ? AND `semester` = ?', [nim, semester],
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


