const Contenedor = require('./Contenedor')
const express = require('express');

const contenedor = new Contenedor('./productos.txt');
const app = express();


app.get('/', (required, response) => {
    response.send("Mamá aprendi a hacer un server")
});

app.get('/productos', async (required, response) => {
    const productos = await contenedor.getAll();
    response.json(productos);
});

app.get('/productoRandom', async (required, response) => {
    await response.send("Mamá aprendi a hacer un server")
});

app.listen(2000, () => {
    console.log("Puerto 2000 escuchando");
})






