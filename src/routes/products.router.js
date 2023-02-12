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

export default router;