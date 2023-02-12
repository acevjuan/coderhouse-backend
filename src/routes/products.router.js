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
  let productId;
  if (productsDb.length === 0) {
    productId = 1;
  } else {
    productId = productsDb[productsDb.length - 1].id + 1;
  };
  product = {id: productId, code: `abc${productId}`, ...request.body, thumbnails: []};
  if (!product.id || !product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category || !product.thumbnails) {
    console.error('Not enough information.');
    response.status(400).send({ status: 'Error', message: 'Not enough information.' });
  };
  productsDb.push(product);
  response.send({ status: 'Success!', message: 'Product created succesfully'} );
  fs.writeFile('./files/products.json', JSON.stringify(productsDb), (err) => {
    console.log(err);
  });
});

router.put('/:pid', (request, response) => {
  let productId = parseInt(request.params.pid);
  let productToUpdate = request.body;
  if(productToUpdate.id) {
    return response.send({ status: 'Error', message: 'id cannot be updated.' });
  };
  const productPosition = productsDb.findIndex((p => p.id === productId));
  console.log(productId);
  if (productPosition < 0) {
    return response.status(202).send({ status: 'info', error: 'Usuario no encontrado' });
  };
  if (productToUpdate.title && productToUpdate.description && productToUpdate.price && productToUpdate.thumbnail && productToUpdate.code && productToUpdate.stock) {
    productToUpdate.id = productsDb[productPosition].id;
    productsDb[productPosition] = productToUpdate;
    fs.writeFile('./files/products.json', JSON.stringify(productsDb), (err) => {
      console.log(err);
    });
    return response.send({ status: 'Success!', message: 'Product updated'});
  } else {
    return response.status(202).send({ status: 'info', error: 'Not enough information.' });
  }
});

router.delete('/:pid', (request, response) => {
  let productId = parseInt(request.params.pid);
  let productExists = productsDb.find(p => p.id === productId);
  if (!productExists) {
    return response.status(202).send({ status: 'info', error: 'error' });
  };
  let productIndex = productsDb.findIndex(p => p.id === productId);
  productsDb.splice(productIndex, 1);
  fs.writeFile('./files/products.json', JSON.stringify(productsDb), (err) => {
    console.log(err);
  });
  return response.send({ status: 'Success!', message: 'Product deleted'});
})

export default router;