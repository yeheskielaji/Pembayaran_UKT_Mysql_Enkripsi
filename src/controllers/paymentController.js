import { validationResult } from "express-validator";
import paymentService from "./../services/paymentService";

let getPagePayment = (req, res) => {
    // Render halaman pembayaran dengan formulir untuk mengunggah bukti pembayaran
    return res.render("payment.ejs", {
        errors: req.flash("errors"),
        user: req.user
    });
};

let processPayment = async (req, res) => {
        // Validasi kolom yang dibutuhkan
        let errorsArr = [];
        let validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            let errors = Object.values(validationErrors.mapped());
            errors.forEach((item) => {
                errorsArr.push(item.msg);
            });
            req.flash('errors', errorsArr);
            return res.redirect('/payment');
        }
    
        // Proses pembayaran
        let paymentData = {
            nim: req.body.nim,
            nama: req.body.nama,
            semester: req.body.semester,
            nominal: req.body.nominal,
            bukti_pembayaran: req.file.filename,
        };
    
    try {
        await paymentService.processPayment(paymentData);
        return res.redirect('/payment'); // Redirect ke halaman sukses setelah pembayaran berhasil
    } catch (err) {
        req.flash("errors", err);
        console.log("Failed to process");
        return res.redirect('/payment');
    }
};

module.exports = {
    getPagePayment: getPagePayment,
    processPayment: processPayment,
};
