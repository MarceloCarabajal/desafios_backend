import fs from 'fs';
const path = './src/models/products.json';

class Product {
    constructor(title, description, category, price, thumbnail, code, stock, status) {
        this.id = Product.addId();
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
    }

    static addId() {
        if (this.idIncremental) {
            this.idIncremental++;
        } else {
            this.idIncremental = 1;
        }
        return this.idIncremental;
    }
}

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async (obj) => {
        try {
            let products = await this.getProducts();
            if (products.some(p => p.code === obj.code)) {
                console.log(`El código de producto ${obj.code} ya existe`);
                return;
            }
            if (Object.values(obj).some(value => value === "" || value === null || value === undefined)) {
                console.log("Los campos no pueden estar vacíos");
                return;
            }
            const product = new Product(obj.title, obj.description, obj.category, obj.price, obj.thumbnail, obj.code, obj.stock, true);
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                let products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (productId) => {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === productId) || null;
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (productId, newProductData) => {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(p => p.id === productId);
            if (index === -1) {
                console.log(`No existe producto con id: ${productId}`);
                return null;
            }
            products[index] = { ...products[index], ...newProductData };
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log(`Se actualizó producto con id ${productId}`);
            return products[index];
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (productId) => {
        try {
            const products = await this.getProducts();
            const newProducts = products.filter(p => p.id !== parseInt(productId));
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
            console.log(`Producto con id ${productId} eliminado`);
            return newProducts;
        } catch (error) {
            console.log(error);
        }
    }
}
