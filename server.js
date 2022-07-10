import express from 'express';
import random from 'random'
import {contenedor1 } from './main.js';
const app = express()

const allProducts = await contenedor1.getAll()



app.get('/productos', (req, res)=>{
    const resultado = JSON.stringify(allProducts)
    
    res.send(`<h1>${resultado}</h1>`)
})

app.get('/productoRandom', (req, res)=>{
    //Generacion de un número al azar
    const numRandom = random.int(1, allProducts.length)

    const productId = allProducts.find(item => item.id === numRandom)
    const resultado = JSON.stringify(productId)
    
    res.send(`<h1>${resultado}</h1>`)
})

const PORT = 8000

const server = app.listen(PORT, ()=> {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))