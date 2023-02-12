// Importando librerías Express JS y File System.
import express from 'express';
import * as fs from 'fs';

//Importando routers de products y carts.
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

import { ProductManager } from './ProductManager.js';

// Incluyendo Express JS.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// La variable dataBase almacenará la lista de productos que vendrá del products.json.
let dataBase;

// Trayendo base de datos del archivo products.json.
fs.readFile('./files/products.json', 'utf-8', (error, data) => {
	if (error) {
		console.log(`ERROR: ${error}`);
		return;
	}
	const jsonData = JSON.parse(data);
	dataBase = jsonData;
});

// Endpoint para mostrar todos los prodcutos y filtrados por límite.
app.get("/products", (request, response) => {
  let limit = parseInt(request.query.limit);
  if (limit) {
    const listLimit = [];
    for (let i = 1; i <= limit; i++) {
      if (listLimit.length < dataBase.length) {
        listLimit.push(dataBase[i - 1]);
      };
    };
    response.send(listLimit);
  } else {
    response.send(dataBase);
  };
});

// Endpoint para mostrar producto por su id.
app.get("/products/:pid", (request, response) => {
  const product = dataBase.find(element => element.id == request.params.pid);
  if (product) {
    response.send(product);
  } else {
    response.send({ message: `Couldn't find a product with id ${request.params.pid}` });
  }
})

// Información del servidor.
const SERVER_PORT = 8080;

app.listen(SERVER_PORT, () => {
  console.log(`Listening server on port ${SERVER_PORT}`);
});