const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
//import Router from 'express';
//import {contenedor1 } from './main.js';
//const router = Router();

const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partliasDir: __dirname + '/views/partials/',
})
app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "./views")

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const arrayProductos = [{nombre: "mochila", precio: 5000, foto:"https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Backpack-256.png"},
                   {nombre:"regla", precio: 1000, foto:"https://cdn0.iconfinder.com/data/icons/mac-applications-icons-by-omer-cetin/128/ruler.png"},
                   {nombre:"transportador", precio: 250, foto:"https://cdn1.iconfinder.com/data/icons/office-material-9/128/curve_ruler_protactor_ruler_set_square_stationary-128.png"},
                   {nombre:"lapicera", precio: 120, foto:"https://cdn2.iconfinder.com/data/icons/scrap/Pen.png"}]


app.get("/", (req, res) =>{
    res.render("form");
})
app.get("/productos",(req, res)=>{
    res.render("main",{array: arrayProductos, listExists: true})
})
app.post("/productos", (req, res)=>{
    const productoRecibido = req.body
    const productoNuevo = {nombre: productoRecibido.title , precio: productoRecibido.price, foto: productoRecibido.thumbnail};
    const productos = [...arrayProductos, productoNuevo]
    res.render("main", {array: productos, listExists: true})
})

/* 
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

    const objeto = {price: 10, title: "hoja", thumbnail: "www.hoja.com.ar", id: idRecibido}

    contenedor1.updateById(idRecibido, objeto).then((resp)=>res.json(resp))
    .catch((err)=>console.log(err))

})

router.delete("/api/productos/:id", (req, res)=>{

    const id = req.params.id

    contenedor1.deleteById(id).then((resp)=> res.json(resp))
    .catch((err)=>console.log(err))
})

 */

const PORT = 8000

const server = app.listen(PORT, ()=> {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))