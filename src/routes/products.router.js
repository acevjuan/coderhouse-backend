import { Router } from "express";
import * as fs from 'fs';

import { ProductManager } from '../classes/ProductManager.js';

const router = Router();

// La variable productsDb almacenará la lista de productos que vendrá del products.json.
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

// Endpoint para mostrar todos los prodcutos y filtrados por límite.
router.get("/", (request, response) => {
  let limit = parseInt(request.query.limit);
  if (limit) {
    const listLimit = [];
    for (let i = 1; i <= limit; i++) {
      if (listLimit.length < productsDb.length) {
        listLimit.push(productsDb[i - 1]);
      };
    };
    response.send(listLimit);
  } else {
    response.send(productsDb);
  };
});

// Endpoint para mostrar producto por su id.
router.get("/:pid", (request, response) => {
  const product = productsDb.find(element => element.id == request.params.pid);
  if (product) {
    response.send(product);
  } else {
    response.send({ message: `Couldn't find a product with id ${request.params.pid}` });
  };
});

router.post('/', (request, response) => {
  let product = {};
  let productId = productsDb.length;
  if (productsDb[productsDb.length - 1].id === productId) {
    productId = productId + 1;
  }
  product = {id: productId, ...request.body}
  if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
    console.error('Not enough information.');
    response.status(400).send({ status: 'Error', message: 'Not enough information.' });
  }
  productsDb.push(product);
  response.send({ status: 'Success!', message: 'Product created succesfully'} );
  fs.writeFile('./files/products.json', JSON.stringify(productsDb), (err) => {
    console.log(err);
  });
});

export default router;