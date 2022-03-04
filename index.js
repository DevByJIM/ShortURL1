const express = require('express');
const { create } = require("express-handlebars");

const app = express();

const hbs = create({
    extname: ".hbs",
    partialsDir:["views/components"],
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
    const urls = [
        {origin: "www.google.es/home1", shortURL:"jfasdk1"},
        {origin: "www.google.es/home2", shortURL:"jfasdk2"},
        {origin: "www.google.es/home3", shortURL:"jfasdk3"},
        {origin: "www.google.es/home4", shortURL:"jfasdk4"}
    ]
    res.render('home', {urls});
})
app.get("/login", (req, res) => {
    res.render('login');
})
app.use(express.static(__dirname + "/public"));

app.listen(5000, () => console.log("Servidor andando👌"));