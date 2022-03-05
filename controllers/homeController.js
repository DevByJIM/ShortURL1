const leerUrls = async(req, res) =>{
    const urls = [
        { origin: "www.google.es/home1", shortURL: "jfasdk1" },
        { origin: "www.google.es/home2", shortURL: "jfasdk2" },
        { origin: "www.google.es/home3", shortURL: "jfasdk3" },
        { origin: "www.google.es/home4", shortURL: "jfasdk4" }
    ]
    res.render('home', { urls });
};

const agregarUrl = async(req, res) =>{};

module.exports = {
    leerUrls: leerUrls,
    agregarUrl: agregarUrl
}