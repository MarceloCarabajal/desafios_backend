const socketClient = io();

const addForm = document.getElementById('addProductForm');

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const thumbnail = [];
    const product = {title, category, description, price, code, stock, thumbnail};
    socketClient.emit('addProduct', product); //envio info a mi servidor
})

socketClient.on("msgAddProduct", (mensaje) => {
    if(mensaje.success) {
        Swal.fire({
            icon: "success",
            title: "Product Added",
            text: "Product Added successfully",
            showConfirmButton: false,
            timer: 1500
        });
        //vaciar los campos del formulario
        addForm.reset();  
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: mensaje.error,
        });
    }
});

socketClient.on("msgDeleteProduct", (mensaje) => {
    if (mensaje.success) {
        Swal.fire({
            icon: "success",
            title: "Product Deleted",
            text: "Product Deleted successfully",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: mensaje.error,
        });
    }
})

socketClient.on('getProducts', (products) => {
    const prodsFromServer = document.getElementById('productsFromServer')
    prodsFromServer.innerHTML = '';

    products.forEach(product => {
        prodsFromServer.innerHTML +=
        `
        <div>
        <h5>Producto: ${product.title}</h5>
            <p>Categoría: ${product.category}</p>
            <p>Descripción: ${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Código: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
            <p>${product.thumbnail}</p>
            <button onclick="deleteProduct('${product.id}')">Eliminar</button>
        </div>
        `
    })
});

deleteProduct = (id) => {
    socketClient.emit('deleteProduct', id);
}