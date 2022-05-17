const express = require('express');
const { Router } = express;
const handlebars = require('express-handlebars')

const Contenedor = require('./Contenedor');


const PORT = 8081;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.engine('handlebars', handlebars.engine())

app.set('views', './public/views')
app.set('view engine', 'handlebars')


const productosApi = new Router();

const c = new Contenedor;

productosApi.get('/', (req, res) => {
    const productos = c.getAll();
    /* 
     productos.forEach(producto => {
         data = {
             title: producto.title,
             price: producto.price,
             thumbnail: producto.thumbnail
         }
     }); */

    res.render('datos', { productos: productos, listExists: productos.length >= 1 })

})

productosApi.get('/:id', (req, res) => {
    const num = parseInt(req.params.id);
    res.send(c.getById(num));
})


productosApi.post('/', async (req, res) => {
    try {
        c.save(req.body);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }

})

productosApi.put('/:id', (req, res) => {
    res.send(c.update(req.body, req.params.id))

})

productosApi.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.send({ borrada: c.deleteById(id) })
})


app.use('/api/productos', productosApi);

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})
server.on("error", error => console.log(`Error en servidor ${error}`))



/* app.get('/', (req, res) => {
    res.send({ mensaje: 'Hola,Bienvenido a la pagina web de Rodrigo' })
}) */

/* app.get('/productos', (req, res) => {
    res.send(c.getAll())
})

app.get('/productoRandom', (req, res) => {
    res.send(c.random());
}) */