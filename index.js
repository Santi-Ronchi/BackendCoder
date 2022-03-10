const Contenedor = require('./Contenedor')
const express = require('express');
const { Router } = express;
const app = express();
const PORT = 3000;

const contenedor = new Contenedor('./productos.txt');
app.use(express.static('public'));
const router = Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}))


/*router.get('/', (req, res) => {
    res.send("Mamá aprendi a hacer un server")
});*/

router.get('/', async (req, res) => {
    const productos = await contenedor.getAll();
    res.type('application/json');
    res.json(productos);
});

router.get('/:producto', async (req, res) => {
    console.log(req.params.producto);
    const prodPedido = await contenedor.getById(req.params.producto);
    res.type('application/json');
    res.json(prodPedido);
});

router.get('/productoRandom', async (req, res) => {
    const prodRandom = await contenedor.getRandom();
    res.type('application/json');
    res.json(prodRandom);
});

router.post('/', async (req, res) => {
    const prodAgregado = await contenedor.save(req.body);
    res.type('application/json');
    res.json(prodAgregado);
});

router.put('/:id', async (req, res) => {
    console.log("entre al put(o)");
    await contenedor.updateById(req);
    res.type('application/json');
    res.json("Producto actualizado OK.");
});

router.delete('/:id', async (req, res) => {
    await contenedor.deleteById(req.params.id);
    res.type('application/json');
    res.json("Producto eliminado OK.");
});

const server = app.listen(PORT, () =>{
    console.log('servidor levantado en puerto ' + server.address().port);
})






app.use('/api/productos', router)
server.on('error', (error) => console.log('hubo un error ${error}'));