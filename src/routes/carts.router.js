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
  response.send({ status: 'Success!', message: 'Cart created succesfully'} );
});

export default router;