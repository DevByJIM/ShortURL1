const express = require("express");
const { body } = require("express-validator");
const {
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser,
} = require("../controllers/authController");
const router = express.Router();

router.get("/register", registerForm);
router.post(
    "/register",
    [
        body("userName", "Ingrese un nombre válido")
            .trim()
            .notEmpty()
            .escape(),
        body("email", "Ingrese un email válido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Ingrese una contraseña de mínimo 6 caracteres")
            .trim()
            .isLength({ min: 6 })
            .escape()
            .custom((value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error("Contraseñas no coincidentes")
                } else {
                    return value;
                }
            }),
    ],
    registerUser
);

router.get("/confirmar/_token", confirmarCuenta);

router.get("/login", loginForm);
router.post("/login", [
    body("email", "Ingrese un email válido")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Ingrese una contraseña de mínimo 6 caracteres")
        .trim()
        .isLength({ min: 6 })
        .escape()
], loginUser);

module.exports = router;
