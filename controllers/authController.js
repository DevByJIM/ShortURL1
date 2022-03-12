const User = require("../models/User");
const { nanoid } = require("nanoid");
const { validationResult } = require("express-validator");

const registerForm = (req, res) => {
    res.render("register", { mensajes: req.flash().mensajes});
};

const registerUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash("mensajes", errors.array());
        return res.redirect("/auth/register");
    }

    const { userName, email, password } = req.body;
    try {
        if (await User.findOne({ email }))
            throw new Error("El usuario ya existe en la bbdd");

        const user = new User({
            userName,
            email,
            password,
            tokenConfirm: nanoid(),
        });

        await user.save();

        req.flash("mensajes", [{msg: "Revisa tu correo electrónico y valida tu cuenta."}]);
        //Enviar correo electrónico

        res.redirect("/auth/login");
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/auth/register");
    }
};

const confirmarCuenta = async (req, res) => {
    const { token } = req.params;
    console.log(token)
    try {
        const user = await User.findOne({ tokenConfirm: token });
        if (!user) throw new Error("No existe este usuario");

        user.cuentaConfirmada = true;
        user.tokenConfirm = null;
        await user.save();

        res.redirect('/auth/login');
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/auth/login");
    }
};

const loginForm = (req, res) => {
    res.render("login",{ mensajes: req.flash().mensajes});
};

const loginUser = async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array());
        return res.redirect("/auth/login");
    }

    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email});

        if(!user) throw new Error("No existe el usuario.")
        if(!user.cuentaConfirmada) throw new Error("Falta confirmar cuenta.")

        if(!await user.comparePassword(password)) 
            throw new Error("Contraseña no válida.")

        return res.redirect('/');

    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/auth/login");
    }
};



module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser
};
