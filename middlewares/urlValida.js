const { URL } = require("url");

const urlValidar = (req, res, next) =>{
    try {
        const { origin } = req.body;
        const urlFrontEnd = new URL(origin);
        if(urlFrontEnd.origin !== "null"){
            if(urlFrontEnd.protocol === "http:" || urlFrontEnd.protocol === "https:") 
                return next();
            
        } else {
            throw new Error("Url no Valida 🤢")
        }
    } catch (error) {
        return res.send("url no válida");
    }

};

module.exports = urlValidar;