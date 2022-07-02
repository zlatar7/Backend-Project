import { promises } from 'fs';

class Contenedor{
    constructor (nombreArchivo) {
        this.archivo = nombreArchivo
    }

    async save(objeto){
        try {
            const contenido = await promises.readFile(this.archivo, "utf-8")
            const info = JSON.parse(contenido)

                    //Asiganción del ID al objeto (Array con productos existentes)

                if (info.length > 0) {
                    const ultimoElemento = info[info.length -1];
                    const id = ultimoElemento.id + 1;
                    const objetoConId = {...objeto, id};

                    //Se agrega el objeto al array 
                    const arrayCompleto = JSON.stringify([...info, objetoConId]);
    
                await promises.writeFile(this.archivo, arrayCompleto)

                return `Se ha agregado el producto, y su nuevo ID es: ${id}`
                    
                } else {

                    //Asiganción del ID al objeto (si el Array de productos está vacío)
                    const id = 1
                    const objetoConId = {...objeto, id} 
                
                    const arrayCompleto = JSON.stringify([...info, objetoConId])
                    
                    await promises.writeFile(this.archivo, arrayCompleto)
                
                    return `Se ha agregado el producto, y su nuevo ID es: ${id}`
                }
            }            
        catch (error) {
            console.log(error)
            }
    }

    async getById(numId){
        try {
            const contenido = await promises.readFile(this.archivo, "utf-8");
            const info = JSON.parse(contenido);

            const elementoEncontrado = info.find(elemento => elemento.id == numId)
          
            if(elementoEncontrado) {
                return elementoEncontrado
            } else {
                return 'Elemento no encontrado'
            }


        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const contenido = await promises.readFile(this.archivo, "utf-8");
            const info = JSON.parse(contenido);

            return info

        } catch (error) { 
            console.log(error)
        }
    }

    async deleteById(numId){
        try {

            const contenido = await promises.readFile(this.archivo, "utf-8");
            const info = JSON.parse(contenido);

            const elemento = info.find(elemento => elemento.id == numId);

                if(elemento){
                
                // Obtengo un array con todos los elementos excepto el elemento con el ID ingresado
                    const nuevoArray = info.filter(elemento => elemento.id != numId)
                    
                    await promises.writeFile(this.archivo, JSON.stringify(nuevoArray))
                    
                    return 'Elemento eliminado'

                }else{

                    return `No hay elementos con el ID ingresado`
            }

        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            const arrayVacio = JSON.stringify([])
            await promises.writeFile(this.archivo, arrayVacio)
            
            return "Todos los productos han sido eliminados"

        } catch (error) {
            console.log(error)
        }
    }
}

const contenedor1 = new Contenedor('productos.txt')

//TESTS DE LAS FUNCIONES

contenedor1.save({title:"transportador", price: 100, thumbnail:"https://fotos.com.ar"}).then((res) => console.log(res))
/*
const contenedor2 = new Contenedor('productos.txt')
//Se utiliza el SetTimeout asi no se superpone con el primer producto a guardar
setTimeout(()=>{contenedor2.save({title:"compás",price: 250, thumbnail:"https://compas.com.ar"}).then((res) => console.log(res));}, 1500)
*/

//contenedor1.getById(2).then((res) => console.log(res))

//contenedor1.getAll().then((res) => console.log(res))

//contenedor1.deleteAll().then((res) => console.log(res))

//contenedor1.deleteById(3).then((res) => console.log(res))