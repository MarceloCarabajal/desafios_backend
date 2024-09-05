import { describe, test, before } from 'node:test';
import assert from 'node:assert';

const apiUrl = "http://localhost:8080";

describe('Products API test', () => {

    // Test para obtener todos los productos
    test('GET /products should return a list of products', async () => {
        const response = await fetch(`${apiUrl}/products/`);
        const responseJSON = await response.json();
        assert.strictEqual(Array.isArray(responseJSON.data.docs), true);
        assert.ok(responseJSON.data.docs.length > 0, "No hay productos en la base de datos");
        assert.strictEqual(responseJSON.status, 200);
    });

    // Test para obtener un producto por ID
    test("GET /products/:id should return the correct product", async () => {
        const response = await fetch(`${apiUrl}/products/`);
        const responseJson = await response.json();
        const { _id } = responseJson.data.docs[0];
        const productById = await fetch(`${apiUrl}/products/${_id}`);
        const productByIdJson = await productById.json();
        assert.strictEqual(response.status, 200);
        assert.ok(typeof productByIdJson === "object");
        assert.strictEqual(_id, productByIdJson.data._id);
      });

    //   describe('Carts API test', () => {
    //     let cartId;
    //     let productId;
    
    //     // Test para agregar un producto al carrito
    //     test('POST /carts/:id/products should add a product to the cart', async () => {
    //         // Primero crear un producto
    //         const newProduct = {
    //             title: "Test Product for Cart",
    //             price: 50,
    //             description: "A product created for cart testing",
    //             category: "Test"
    //         };
    
    //         const productResponse = await fetch(`${apiUrl}/products`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(newProduct),
    //         });
    //         const productJSON = await productResponse.json();
    //         productId = productJSON.data._id;
    
    //         // Luego, agregar el producto al carrito
    //         const cartResponse = await fetch(`${apiUrl}/carts`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ products: [productId] }),
    //         });
    //         const cartJSON = await cartResponse.json();
    //         cartId = cartJSON.data._id;
    
    //         assert.strictEqual(cartResponse.status, 201);
    //         assert.strictEqual(cartJSON.data.products.length, 1);
    //         assert.strictEqual(cartJSON.data.products[0], productId);
    //     });
    
    //     // Test para obtener los productos de un carrito
    //     test('GET /carts/:id should return the products in the cart', async () => {
    //         const response = await fetch(`${apiUrl}/carts/${cartId}`);
    //         const responseJSON = await response.json();
    
    //         assert.strictEqual(response.status, 200);
    //         assert.ok(Array.isArray(responseJSON.data.products));
    //         assert.strictEqual(responseJSON.data.products.length, 1);
    //         assert.strictEqual(responseJSON.data.products[0], productId);
    //     });
    
    //     // Test para eliminar un producto del carrito
    //     test('DELETE /carts/:id/products/:productId should remove a product from the cart', async () => {
    //         const response = await fetch(`${apiUrl}/carts/${cartId}/products/${productId}`, {
    //             method: 'DELETE',
    //         });
    
    //         const responseJSON = await response.json();
    //         assert.strictEqual(response.status, 200);
    //         assert.strictEqual(responseJSON.message, "Product removed from cart");
    //     });
    // });
    describe('Users API test', () => {
        let token;
    
        // Test de inicio de sesión
        test('POST /users/login should log in the user', async () => {
            const loginDetails = {
                email: "matias@matias.com",
                password: "1234",
            };
    
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify(loginDetails),
            });
    
            const responseJSON = await response.json();
            token = responseJSON.data;
    
            assert.strictEqual(response.status, 200);
            assert.ok(typeof responseJSON === 'object');
            assert.ok(token, "Token no generado correctamente");
        });
    
        // Test de cierre de sesión
        test('POST /users/logout should log out the user', async () => {
            const response = await fetch(`${apiUrl}/users/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
    
            assert.strictEqual(response.status, 200);
        });
    });
})