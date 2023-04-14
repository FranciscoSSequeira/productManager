const fs = require('fs');
const { dirname } = require('path');
const path = require("path");


class ProductManager {
    constructor() {


        this.file = path.join(__dirname, 'products.json');
    }


    async getProdutcs() {
        if (fs.existsSync(this.file)) {
            let rawdata = await fs.promises.readFile('products.json');
            let resultado = JSON.parse(rawdata)
            return resultado;
        }
        else {
            await fs.promises.writeFile('products.json', JSON.stringify([], null, 2))
            let rawdata = await fs.promises.readFile('products.json');
            let resultado = JSON.parse(rawdata);
            return resultado;
        }
    }


    async addProducts(producto) {
        let data = await this.getProdutcs();
        if (data.length > 0) {
            let nuevoid = data[data.length - 1].id + 1;
            const newProduct = {
                id: nuevoid,
                ...producto
            };


            data.push(newProduct);
            await fs.promises.writeFile('products.json', JSON.stringify(data, null, 2))
            return newProduct.id
        }
        else {
            const newProduct = {
                id: 1,
                ...producto
            };


            data.push(newProduct);
            await fs.promises.writeFile('products.json', JSON.stringify(data, null, 2))
            return newProduct.id
        }
    }


    async getProductsById(id) {
        let data = await this.getProdutcs();
        let byId = data.find(e => e.id == id);
        return byId;
    }


    async updateProduct(id, upgrade) {
        let data = await this.getProdutcs();
        let update = [];
        data.forEach(element => {
            if (element.id == id) {
                let producto = { id: id, ...upgrade }
                update.push(producto);
            } else {
                update.push(element)
            }
        }
        );


        await fs.promises.writeFile('products.json', JSON.stringify(update, null, 2))


    }


    async deleteProduct(id) {
        let data = await this.getProdutcs();
        let del = data.filter(e => e.id != id);
        await fs.promises.writeFile('products.json', JSON.stringify(del, null, 2))
    }
}



let producto1 = {
    title: "Nike",
    description: "Zapatilla urbana",
    price: 13000,
    thumbnail: "https://www.pexels.com/es-es/foto/foto-de-zapatillas-sobre-fondo-blanco-2529148/",
    code: 3,
    stock: 10
}


let producto2 = {
    title: "Adidas",
    description: "Zapatilla urbana",
    price: 15000,
    thumbnail: "https://www.pexels.com/es-es/foto/foto-de-primer-plano-de-los-zapatos-adidas-1599005/",
    code: 3,
    stock: 1
}


let producto = new ProductManager();
// producto.fileExists();
async function ejecution() {
     await producto.addProducts(producto1);
    //   await producto.addProducts(producto2);
    //  console.log(await producto.getProductsById(3));



    // await producto.updateProduct(1, {
    //   title: 'Reebook',
    //   description: 'Zapatilla urbana running',
    //   price: 16000, 
    //   thumbnail: 'https://www.pexels.com/es-es/foto/par-de-zapatillas-adidas-negras-y-grises-con-caja-684152/',
    //   code: 3,
    //   stock: 4
    // });


    // await producto.deleteProduct(5);
}


ejecution();

