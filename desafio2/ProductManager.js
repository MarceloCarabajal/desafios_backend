//DESAFIO 2

const fs = require('fs');
const path = './products.json';

class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.id = Product.addId(),
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
    //genero id autoincromentable
    static addId(){
        if(this.idIncremental){
            this.idIncremental ++;
        } else {
            this.idIncremental = 1;
        }
        return this.idIncremental;
    }
}

class ProductManager {
    constructor(path){
    this.path = path;
    }
    addProduct = async(product) => {
        try {
            //obtengo productos actuales
            let products = await this.getProducts();
            //verifico codigo que no este repetido
            if(products.some(p => p.code === product.code)){
                console.log(`el codigo de producto ${product.code} ya existe`);
                return;
            }
            //verifico que todos los campos esten completados
            if(Object.values(products).includes("") || Object.values(products).includes(null)){
                console.log("Los campos no pueden estar vacios");
                return;
            }
            //agrego nuevo producto 
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }        
    }

    getProducts = async() => {
        try {
            if(fs.existsSync(this.path)){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                let aux = JSON.parse(products);
                return aux;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async(productId) => {
        const products = await this.getProducts();
        const product = products.find(product => product.id === productId);
        if(product){
            return product;
        } else {
            console.log('No existe producto');
        }
    }

    updateProduct = async(productId, entry, newValue) => {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === productId);
        if(index=== -1){
            console.log(`No existe producto con id: ${productId}`);
            return;
        }
            
        const product = products[index];
        product[entry] = newValue; //actualiza el campo especificado

        await fs.promises.writeFile(this.path, JSON.stringify(products));
        console.log(`se actualizo producto con id ${productId}`);
    }

    deleteProduct = async(productId) => {
        const products = await this.getProducts();
        const product = products.filter(p => p.id !== productId);
        await fs.promises.writeFile(path, JSON.stringify(product));
        console.log(`producto con id ${productId} eliminado`);
        //return product;
    }

}

//instancio ProductManager
const productManager = new ProductManager(path);

//instancio Product
const product1 = new Product("Laptop", "Laptop", 900000, "https://www.nextclick.com.ar/Temp/App_WebSite/App_PictureFiles/Items/0196804274027_800.jpg", "10", 5);
const product2 = new Product("Teclado", "Teclado Redragon", 60000, "https://redragon.es/content/uploads/2021/05/K552-KR-SPS-KUMARA-RAINBOW-SPAIN1.png", "20", 10);
const product3 = new Product("Mouse", "Mouse Redragon", 40000, "https://redragon.es/content/uploads/2021/04/GRIFFIN-B.png", "30", 10);
const product4 = new Product("error","Mouse Redragon", 40000, "https://redragon.es/content/uploads/2021/04/GRIFFIN-B.png", "30", 10);


const test = async() => {
    //creo archivo JSON vacio
    await fs.promises.writeFile(path, "[]");
    //listo array de productos que deberia estar vacio
    console.log(await productManager.getProducts());
    //agrego productos
    await productManager.addProduct(product1);
    await productManager.addProduct(product2);
    await productManager.addProduct(product3);
    await productManager.addProduct(product4);
    //listo array de productos agregados
    console.log(await productManager.getProducts());
    //busqueda de productos, uno existe y el otro no
    console.log(await productManager.getProductById(1));
    console.log(await productManager.getProductById(6));
    //actualizo productos
    await productManager.updateProduct(1, "stock", 10);
    await productManager.updateProduct(2, "price", 50000);
    //borrar un producto por su id
    //await productManager.deleteProduct(1);
}

test();
