console.log("Desde la carpeta public.");

document.addEventListener('click', e =>{
    if(e.target.dataset.short){
        const url = `http://localhost:5000/${e.target.dataset.short}`;

        navigator.clipboard
        .writeText(url)
        .then(() =>{
            console.log("Texto copiado al clipboard...");
        })
        .catch((err)=>{
            console.log("Algo salió mal en el copiado al clipboard...");
        })

    }
})