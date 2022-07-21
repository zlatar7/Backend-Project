import express from 'express';
import Router from 'express';
import {contenedor1 } from './main.js';
const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use("/", router);

const allProducts = await contenedor1.getAll();

router.get('/api/productos', (req, res)=>{    
    contenedor1.getAll().then((resp)=>res.json(resp))
    .catch((err)=> console.log(err))
})

router.get('/api/productos/:id', (req, res)=>{

    const id = req.params.id

    contenedor1.getById(id).then((resp)=> res.json(resp))
    .catch((err)=> console.log(err))
    
})

router.post('/api/productos', (req, res) => {
    
    const producto = {price: req.body.price, title: req.body.title, thumbnail: req.body.thumbnail}

    contenedor1.save(producto).then((resp)=> res.json(resp))
    .catch((err)=> console.log(err))
})

router.put("/api/productos/:id", (req, res) => {

    const idRecibido = req.params.id

/* No pude obtener los values a través de parametros usando postman postman, entonces hardcodee
     el objeto que se va a actualizar (menos el id que eso si lo puedo obtener con params) */

    const objeto = {price: 10, title: "hoja", thumbnail: "www.hoja.com.ar", id: idRecibido}

    contenedor1.updateById(idRecibido, objeto).then((resp)=>res.json(resp))
    .catch((err)=>console.log(err))

})

router.delete("/api/productos/:id", (req, res)=>{

    const id = req.params.id

    contenedor1.deleteById(id).then((resp)=> res.json(resp))
    .catch((err)=>console.log(err))
})



const PORT = 8000

const server = app.listen(PORT, ()=> {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))