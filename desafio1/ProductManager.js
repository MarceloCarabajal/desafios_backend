//DESAFIO 1
class ProductManager {
    constructor(){
    this.products=[];
    }

    addProduct(title, description, price, thumbnail, code, stock){
        //valido que todos los campos sean obligatorios
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Los campos no pueden estar vacios");
            return;
        }

        //validar que no se repita codigo
        if(this.products.some(p => p.code === code)){
            console.log("el codigo ya existe");
            return;
        }

        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
    }

    getProducts(){
        return this.products;
    }

    #getMaxId(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    getProductById(productId) {
        return this.products.find(p => p.id === productId);
    }

}

const productManager = new ProductManager();

productManager.addProduct("Laptop", "Laptop", 900000, "https://www.nextclick.com.ar/Temp/App_WebSite/App_PictureFiles/Items/0196804274027_800.jpg", "10", 5);
productManager.addProduct("Teclado", "Teclado Redragon", 60000, "https://redragon.es/content/uploads/2021/05/K552-KR-SPS-KUMARA-RAINBOW-SPAIN1.png", "20", 10)
productManager.addProduct("Mouse", "Mouse Redragon", 40000, "https://redragon.es/content/uploads/2021/04/GRIFFIN-B.png", "30", 10)

productManager.addProduct("error", "mismo codigo que mouse", 40000, "https://i.pinimg.com/236x/ce/59/83/ce59837dd46efcaa5549a75bf2b1e443.jpg", "30", 10)

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));