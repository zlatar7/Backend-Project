import { promises } from 'fs';

class Contenedor{
    constructor (title, price, thumbnail) {
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    async save(objeto){
        try {
            const contenido = await promises.readFile("./productos.txt", "utf-8")
            const info = JSON.parse(contenido)

                //Asiganción del ID al objeto (Array con productos existentes)
                if (info.length > 0) {
                    const ultimoElemento = info[info.length -1];
                    const id = ultimoElemento.id + 1;
                    const objetoConId = {...objeto, id};
                //Se agrega el objeto al array 
                    const arrayCompleto = JSON.stringify([...info, objetoConId]);
    
                await promises.writeFile("./productos.txt", arrayCompleto)
                console.log("Se ha agregado el producto")
                console.log(`El ID asignado es ${id}`)
                    
                } else {
                //Asiganción del ID al objeto (Array de productos vacío)
                    const id = 1
                    const objetoConId = {...objeto, id} 
                //
                    const arrayCompleto = JSON.stringify([...info, objetoConId])
                    
                await promises.writeFile("./productos.txt", arrayCompleto)
                console.log("Se ha agregado el producto")
                console.log(`El ID asignado es ${id}`)
                }
            }            
        catch (error) {
            console.log(error)
            }
    }

    async getById(numId){
        try {
            const contenido = await promises.readFile("./productos.txt", "utf-8");
            const info = JSON.parse(contenido);

                if (numId <= info.length && numId > 0) {
                    console.log(info.filter(item => item.id === numId))
                } else {
                    console.log(null)
                }
          
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const contenido = await promises.readFile("./productos.txt", "utf-8");
            const info = JSON.parse(contenido);
            console.log(info)
        } catch (error) { 
            console.log(error)
        }
    }

    async deleteById(numId){
        try {
            const contenido = await promises.readFile("./productos.txt", "utf-8");
            const info = JSON.parse(contenido);

            if (info.map(item=>item.id === numId)) {
                //Elimina el elemento del array
                const idElemento = numId - 1;
                info.splice(idElemento, 1);
                
                const nuevoArray = JSON.stringify(info)
                await promises.writeFile("./productos.txt", nuevoArray)
                console.log("El producto seleccionado ha sido eliminado")
            } else {
                console.log("No existe el ID ingresado")                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            const arrayVacio = JSON.stringify([])
            await promises.writeFile("./productos.txt", arrayVacio)
            console.log("Todos los productos han sido eliminados")
        } catch (error) {
            console.log(error)
        }
    }
}

//Prueba de la función Save()
const producto1 = new Contenedor ("pelotas",200,"https://google.com.ar");
producto1.save(producto1)
//Se utiliza el SetTimeout asi no se superpone con el primer producto a guardar
const producto2 = new Contenedor("transportador", 100, "https://fotos.com.ar")
setTimeout(()=>{producto2.save(producto2)}, 1000);
/* 
//Prueba de la función GetById()
producto1.getById(5);
//Prueba de la función GetAll()
producto1.getAll();
//Prueba de la función DeleteById()
producto1.deleteById(2);
//Prueba de la función DeleteAll()
producto1.deleteAll();
*/