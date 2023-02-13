// Importando Router para utilizar los routers creados para el proyecto, así como File System para manejar archivos de base de datos json.
import { Router } from "express";
import * as fs from 'fs';

// Trayendo router.
const router = Router();

// La variable cartsDb traerá y actualizará información en base de datos carts.json.
let cartsDb;

// Trayendo base de datos del archivo carts.json.
fs.readFile('./files/carts.json', 'utf-8', (error, data) => {
	if (error) {
    console.log(`ERROR: ${error}`);
    return;
	}
	const jsonData = JSON.parse(data);
	cartsDb = jsonData;
});

// La variable productsDb traerá información en base de datos products.json.
let productsDb;

// Trayendo base de datos del archivo products.json.
fs.readFile('./files/products.json', 'utf-8', (error, data) => {
	if (error) {
    console.log(`ERROR: ${error}`);
    return;
	}
	const jsonData = JSON.parse(data);
	productsDb = jsonData;
});

// Endpoint para la creación de carritos. Estas se almacenarán en base de datos carts.json.
router.post('/', (request, response) => {
  let cart = {};
  let cartId;
  if (cartsDb.length === 0) {
    cartId = 1;
  } else {
    cartId = cartsDb[cartsDb.length - 1].id + 1;
  }
  cart = { id: cartId, products: [] };
  cartsDb.push(cart);
  fs.writeFile('./files/carts.json', JSON.stringify(cartsDb), (err) => {
    console.log(err);
  });
  return response.send({ status: 'Success', message: 'Cart created successfully', payload: cart});
});

// Endpoint para mostrar carrito según id indicado.
router.get('/:cid', (request, response) => {
  let cartId = parseInt(request.params.cid);
  let cart = cartsDb.find(c => c.id === cartId);
  if (!cart) {
    return response.send({ status: 'Error', message: `Couldn't find a cart with id ${cartId}` });
  } else {
    return response.send({ status: 'Success', message: `Showing cart with id ${cartId}`, payload: cart});
  };
});

// Endpoint para agregar productos de base de datos products.json a carrito.
router.post('/:cid/product/:pid', (request, response) => {
  // Verificando que tanto el producto como el carrito indicado exista.
  let cartId = parseInt(request.params.cid);
  let productId = parseInt(request.params.pid);
  const cartExists = cartsDb.find(c => c.id === cartId);
  const productExists = productsDb.find(p => p.id === productId);;
  if (!cartExists || !productExists) {
    return response.send({ status: 'Error', message: `Cart or product does not exist` });
  };
  // Ubicando carrito en donde se guardará el producto.
  let cartIndex = cartsDb.findIndex(crt => crt.id == cartId);
  const productInCart = cartsDb[cartIndex].products.find(p => p.id == productId);
  // Verificando si ya existe el producto dentro del carrito, actualizando únicamente las cantidades si es el caso.
  if (productInCart) {
    const productInCartIndex = cartsDb[cartIndex].products.findIndex(p => p.id == productId);
    cartsDb[cartIndex].products[productInCartIndex].quantity = cartsDb[cartIndex].products[productInCartIndex].quantity + 1;
    fs.writeFile('./files/carts.json', JSON.stringify(cartsDb), (err) => {
      console.log(err);
    });
    return response.send({ status: 'Success', message: "Product added successfully", payload: cartsDb[cartIndex]});
  } else {
    let product = { id: productId, quantity: 1 };
    cartsDb[cartIndex].products.push(product);
    fs.writeFile('./files/carts.json', JSON.stringify(cartsDb), (err) => {
      console.log(err);
    });
    return response.send({ status: 'Success', message: "Product added successfully", payload: cartsDb[cartIndex]});
  };
});

export default router;