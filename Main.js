class Usuario{
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    arrayMascotas = []
    arrayLibros = []

    getFullName() {
        console.log(`Nombre completo: ${this.nombre} ${this.apellido}`)
    }

    addMascots(mascotas){
        this.arrayMascotas.push(mascotas)
    }

    countMascots(){
        console.log(this.arrayMascotas.length)
    }
    addBooks(libro, autor){
        this.arrayLibros.push({libro: libro, autor: autor})
    }
    getBookNames(){
        console.log(this.arrayLibros.map(item=> item.libro))
    }
}
const Persona1 = new Usuario("Kevin", "Suarez")

Persona1.getFullName()
Persona1.addMascots("Tortuga")
Persona1.countMascots()
Persona1.addBooks("El principito", "Saint-Exupery")
Persona1.getBookNames()