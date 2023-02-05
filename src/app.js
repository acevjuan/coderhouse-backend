import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

const testingProduct = new ProductManager();

const createRandomProductList = (n) => {
  for (let i = 1; i <= n; i++) {
    testingProduct.addProduct(`Producto #${i}`, `Descripción de producto #${i}`, Math.random(), `No image found for product with id ${i}`, `abc${i}`, Math.random());
  };
  return testingProduct.getProducts();
};

const randomProductList = createRandomProductList(10);

app.get("/products", (request, response) => {
  let limit = parseInt(request.query.limit);
  if (limit) {
    const listLimit = [];
    for (let i = 1; i <= limit; i++) {
      if (listLimit.length < randomProductList.length) {
        listLimit.push(randomProductList[i - 1]);
      };
    };
    response.send(listLimit);
  } else {
    response.send(randomProductList);
  };
});

app.get("/products/:pid", (request, response) => {
  const product = randomProductList.find(element => element.id == request.params.pid);
  if (product) {
    response.send(product);
  } else {
    response.send({ message: `No existe producto con id ${request.params.pid}` });
  }
})

const SERVER_PORT = 8080;

app.listen(SERVER_PORT, () => {
  console.log(`Servidor escuchando por el puerto ${SERVER_PORT}`);
});