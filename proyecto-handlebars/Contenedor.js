const fs = require('fs');


const archivo = './productos.txt';
const leerArchivo = fs.readFileSync(archivo, { encoding: 'utf-8' });
const data = JSON.parse(leerArchivo);

//console.log(data);

class Contenedor {

    constructor(archivo) {
        this.archivo = archivo
    }

    save(object) {
        const resultado = this.getAll();
        console.log(resultado);
        let newId;

        if (resultado.length == 0) {
            newId = 1;
        } else {
            newId = resultado[resultado.length - 1].id + 1
        }

        const newObj = { ...object, id: newId };

        resultado.push(newObj);

        fs.writeFileSync(archivo, JSON.stringify(resultado));

    }

    getById(number) {
        const resultado = data.filter(producto => producto.id == number);
        return resultado;
    }

    getAll() {
        const resultado = data.map(producto => producto);
        return resultado;
    }

    deleteById(number) {
        const productos = data.filter(producto => producto.id !== number);
        const resultado = fs.writeFileSync(archivo, JSON.stringify(productos));
        return resultado;
    }

    deleteAll() {
        const data = [];
        const resultado = fs.writeFileSync(archivo, JSON.stringify(data))
        return resultado;
    }

    random() {
        var product = data[Math.floor(Math.random() * data.length)];
        return product;
    }

    update(prod, id) {
        const newProduct = { id: Number(id), ...prod }
        const index = data.findIndex(p => p.id == id)
        if (index !== -1) {
            data[index] = newProduct
            return newProduct
        } else {
            return { error: 'producto no encontrado' }
        }
    }


}


const c = new Contenedor(archivo);

//console.log(c.save({ title: "Escuadra", price: 215, thumbnail: null }));
//console.log(c.getById(1));
//console.log(c.getAll());
//console.log(c.random());
//console.log(c.deleteById(2));
//console.log(c.deleteAll())


module.exports = Contenedor;