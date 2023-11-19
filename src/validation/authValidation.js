import { check, body } from 'express-validator';
import path from 'path';

let validateRegister = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password. Password harus lebih dari 4 karakter")
    .isLength({ min: 4 }),

    check("passwordConfirmation", "Password tidak sama")
    .custom((value, { req }) => {
        return value === req.body.password
    })
];

let validateLogin = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password")
    .not().isEmpty()
];

let validatePayment = [
    check("nim", "NIM tidak valid").isLength({ min: 8}).trim().isNumeric(),
    check("nama", "Nama harus diisi").notEmpty().trim()
    .custom((value, { req }) => {
        const regex = /^[a-zA-Z\s]+$/; // Hanya huruf dan spasi yang diperbolehkan
        if (!regex.test(value)) {
            throw new Error('Nama hanya boleh terdiri dari huruf');
        }
        return true;
    }),
    check("semester", "Semester harus diisi").notEmpty().trim(),
    check("nominal", "Nominal harus diisi").notEmpty().trim().isNumeric(),
    check("nominal", "Nominal harus diisi dan tidak boleh lebih dari 100 juta")
    .notEmpty()
    .trim()
    .isNumeric()
    .custom((value, { req }) => {
        const maxNominal = 100000000;
        if (parseInt(value) > maxNominal) {
            throw new Error(`Nominal tidak boleh lebih dari 100 juta`);
        }
        return true;
    }),

    // Validasi untuk tipe file gambar (jpg atau png)
    body('bukti_pembayaran').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('File bukti pembayaran harus diunggah');
        }
        const allowedExtensions = ['.jpg', '.png'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error('File bukti pembayaran harus berupa format JPG atau PNG');
        }
        return true;
    })
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin,
    validatePayment: validatePayment
};