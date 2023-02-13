// Importando Router para utilizar los routers creados para el proyecto, así como File System para manejar archivos de base de datos json.
import { Router } from "express";
import * as fs from 'fs';

// Para esta entrega no se utilizó esta clase.
import { ProductManager } from '../classes/ProductManager.js';

// Trayendo router.
const router = Router();

// La variable productsDb traerá y actualizará información en base de datos products.json.
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

// Endpoint para mostrar todos los productos y filtrados por límite.
router.get("/", (request, response) => {
  let limit = parseInt(request.query.limit);
  if (limit) {
    const listLimit = [];
    for (let i = 1; i <= limit; i++) {
      if (listLimit.length < productsDb.length) {
        listLimit.push(productsDb[i - 1]);
      };
    };
    response.send({ status: 'Success', message: `Showing a list of ${limit} products`, payload: listLimit});
  } else {
    response.send({ status: 'Success', message: 'Showing all products', payload: productsDb} );
  };
});

// Endpoint para mostrar producto por su id.
router.get("/:pid", (request, response) => {
  const product = productsDb.find(element => element.id == request.params.pid);
  if (product) {
    response.send( {status: 'Success', message: `Showing product with id ${request.params.pid}`, payload: product});
  } else {
    response.send({ status: 'Error', message: `Couldn't find a product with id ${request.params.pid}` });
  };
});

// Endpoint para crear un nuevo producto y registrarlo en la base de datos products.json.
router.post('/', (request, response) => {
  let product = {};
  let productId;
  if (productsDb.length === 0) {
    productId = 1;
  } else {
    productId = productsDb[productsDb.length - 1].id + 1;
  };
  product = {id: productId, code: `abc${productId}`, ...request.body, thumbnails: []};
  if (!product.id || !product.title || !product.description || !product.code || !product.price || product.status === undefined || !product.stock || !product.category || !product.thumbnails) {
    response.status(400).send({ status: 'Error', message: 'Not enough information.' });
  };
  productsDb.push(product);
  fs.writeFile('./files/products.json', JSON.stringify(productsDb), (err) => {
    console.log(err);
  });
  response.send({ status: 'Success', message: 'Product created successfully', payload: product} );
});

// Endpoint para modficar la información de algún producto existente indicando su id.
router.put('/:pid', (request, response) => {
  let productId = parseInt(request.params.pid);
  let productToUpdate = request.body;
  if(productToUpdate.id) {
    return response.send({ status: 'Error', message: 'id cannot be updated.' });
  };
  if(productToUpdate.code) {
    return response.send({ status: 'Error', message: 'Code cannot be updated.' });
  };
  const productPosition = productsDb.findIndex((p => p.id === productId));
  if (productPosition < 0) {
    return response.send({ status: 'Error', message: `Couldn't find a product with id ${productId}` });
  };
  if (productToUpdate.title && productToUpdate.description && productToUpdate.price && productToUpdate.thumbnails && productToUpdate.stock && productToUpdate.category && (productToUpdate.status === true || productToUpdate.status === false)) {
    productToUpdate.id = productsDb[productPosition].id;
    productToUpdate.code = productsDb[productPosition].code;
    productsDb[productPosition] = productToUpdate;
    fs.writeFile('./files/products.json', JSON.stringify(productsDb), (err) => {
      console.log(err);
    });
    return response.send({ status: 'Success', message: 'Product updated successfully', payload: productToUpdate});
  } else {
    return response.send({ status: 'Error', message: 'Not enough information.' });
  }
});

// Endepoint para eliminar producto según id indicado.
router.delete('/:pid', (request, response) => {
  let productId = parseInt(request.params.pid);
  let productExists = productsDb.find(p => p.id === productId);
  if (!productExists) {
    return response.status(202).send({ status: 'Error', message: `Couldn't find a product with id ${productId}` });
  };
  let productIndex = productsDb.findIndex(p => p.id === productId);
  productsDb.splice(productIndex, 1);
  fs.writeFile('./files/products.json', JSON.stringify(productsDb), (err) => {
    console.log(err);
  });
  return response.send({ status: 'Success', message: 'Product deleted successfully' });
})

export default router;