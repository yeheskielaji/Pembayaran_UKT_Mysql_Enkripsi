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

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
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
    router.post("/payment", upload.single('bukti_pembayaran'),auth.validatePayment,paymentController.processPayment);

    return app.use("/", router);
};
module.exports = initWebRoutes;
