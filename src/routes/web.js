import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import paymentController from "../controllers/paymentController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import multer from "multer";
import path from "path";
const decodeController = require('../controllers/decodeController');
import fs from "fs";

// Init all passport
initPassportLocal();

let router = express.Router();

//muller upload
const storage = multer.diskStorage({
    destination: "src/images/",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage: storage });

// Fungsi untuk menghapus gambar setelah rendering selesai
const removeImageAfterRender = (req, res, next) => {
    res.locals.removeImageAfterRender = imagePath => {
        if (!imagePath) return;

        fs.unlink(imagePath, err => {
            if (err) {
                console.error('Failed to delete image:', err);
            }
        });
    };
    next();
};

let initWebRoutes = (app) => {
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/payment",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);

    router.get("/payment", loginController.checkLoggedIn, paymentController.getPagePayment);
    router.post("/payment", upload.single('bukti_pembayaran'), auth.validatePayment, paymentController.processPayment);
    router.get("/", homePageController.renderHomePage);
    router.get("/decode", decodeController.getPageForDecoding);
    router.post("/decode", upload.single('bukti_decode'), decodeController.processDecoding, (req, res) => {
        // Hapus gambar setelah proses render selesai
        res.locals.removeImageAfterRender(path.join('src/images', req.file.filename));
    });

    return app.use("/", router);
};
module.exports = initWebRoutes;