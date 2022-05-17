class Usuario{

    constructor (nombre, apellido, libros, mascota) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = [libros]
        this.mascota = [mascota]   
    }

    getFullName(){
        
        try {
            return `El nombre completo es: ${this.nombre} ${this.apellido}`
        }            
        catch (error) {
            console.log(error)
        }
    }

    addMascota(mascota){
        try {
            return this.mascota.push(mascota)
        }
        catch (error) {
            console.log(error)
        }
    }

    countMascotas(){
        try {
            return `Cantidad de mascotas: ${this.mascota.length}`
        }
        catch (error) { 
            console.log(error)
        }
    }

    addBook(libro){
        try {
            return this.libros.push(libro)
        } catch (error) {
            console.log(error)
        }
    }

    getBookNames(){
        try {
            const nombreLibros = this.libros.map(item => item.Libro).join(", ")
            return `Libros: ${nombreLibros}`
        } catch (error) {
            console.log(error)
        }
    }
}


const persona1 = new Usuario("Juan", "Dominguez",{Libro: "El código Da Vinci", Autor: "Dan Brown"}, "Tortuga");
const persona2 = new Usuario("Monica", "Dominguez",{Libro: "El Principito", Autor: "Saint Exupery"}, "Caballo");


console.log(persona1.getFullName())
console.log(persona2.getFullName())

persona1.addMascota("Conejo")
persona2.addMascota("Pez")
 
console.log(persona1.countMascotas())
console.log(persona2.countMascotas())

persona1.addBook({Libro: "Moby Dick", Autor: "Herman Melville"})
persona2.addBook({Libro: "Moby Dick", Autor: "Herman Melville"})

console.log(persona1.getBookNames())
//console.log(persona2.getBookNames())

