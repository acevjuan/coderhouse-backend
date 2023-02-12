import { Router } from "express";
import * as fs from 'fs';

const router = Router();

// La variable productsDb almacenará la lista de productos que vendrá del products.json.
let cartsDb;

// Trayendo base de datos del archivo products.json.
fs.readFile('./files/carts.json', 'utf-8', (error, data) => {
	if (error) {
    console.log(`ERROR: ${error}`);
    return;
	}
	const jsonData = JSON.parse(data);
	cartsDb = jsonData;
});

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
  return response.send({ status: 'Success!', message: 'Cart created succesfully'} );
});

router.post('/:cid/product/:pid', (request, response) => {
  let cartId = parseInt(request.params.cid);
  let productId = parseInt(request.params.pid);
  const cartExists = cartsDb.find(c => c.id === cartId);
  const productExists = productsDb.find(p => p.id === productId);;
  if (!cartExists || !productExists) {
    return response.send({ message: "no existe" });
  };
  let cartIndex = cartsDb.findIndex(crt => crt.id == cartId);
  const productInCart = cartsDb[cartIndex].products.find(p => p.id == productId);
  if (productInCart) {
    const productInCartIndex = cartsDb[cartIndex].products.findIndex(p => p.id == productId);
    cartsDb[cartIndex].products[productInCartIndex].quantity = cartsDb[cartIndex].products[productInCartIndex].quantity + 1;
    fs.writeFile('./files/carts.json', JSON.stringify(cartsDb), (err) => {
      console.log(err);
    });
    console.log('Nuevo listado de carrito: ', cartsDb);
    return response.send(cartsDb);
  } else {
    let product = { id: productId, quantity: 1 };
    cartsDb[cartIndex].products.push(product);
    fs.writeFile('./files/carts.json', JSON.stringify(cartsDb), (err) => {
      console.log(err);
    });
    return response.send(cartsDb);
  }
})

export default router;