const { nanoid } = require("nanoid");

const Url = require('../models/Url');
const leerUrls = async (req, res) => {

    try {
        const urls = await Url.find().lean();
        res.render('home', { urls });

    } catch (error) {
        console.log(error);
        res.send('error algo falló');
    }

};

const agregarUrl = async (req, res) => {

    const { origin } = req.body;

    try {
        const url = new Url({ origin: origin, shortURL: nanoid(8) });
        await url.save();
        res.redirect('/');
        console.log('Registro Almacenado en la BBDD')
    } catch (error) {
        console.log(error);
        res.send('error algo falló');
    }
};

const eliminarUrl = async (req, res) => {
    const { id } = req.params;
    try {
        await Url.findByIdAndDelete(id);
        res.redirect('/');
        console.log('Registro ' + id + ' eliminado en la BBDD')
    } catch (error) {
        console.log(error);
        res.send('error algo falló');
    }
}

const editarUrlForm = async (req, res) => {
    const { id } = req.params;
    try {

        const url = await Url.findById(id).lean();
        res.render('home', {url});

    } catch (error) {
        console.log(error);
        res.send('error algo falló');
    }
}

const editarUrl = async (req, res) => {
    const { id } = req.params;
    const {origin } = req.body;
    try {

        await Url.findByIdAndUpdate(id,{origin});
        res.redirect('/');
        console.log('Actualizado con éxito');

    } catch (error) {
        console.log(error);
        res.send('error algo falló');
    }
}

const redireccionamiento = async(req,res) =>{
    const {shortURL} = req.params;
    try {
        const urlDb = await Url.findOne({shortURL: shortURL});
        res.redirect(urlDb.origin);
    } catch (error) {
        console.log(error);
        res.send('error algo falló');
    }
}

module.exports = {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrl,
    editarUrlForm,
    redireccionamiento
}