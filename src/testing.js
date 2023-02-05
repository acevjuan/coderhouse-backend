import { ProductManager } from './ProductManager.js';

const testingProduct = new ProductManager();

const createRandomProductList = (n) => {
  for (let i = 1; i <= n; i++) {
    testingProduct.addProduct(`Product #${i}`, `Description of product #${i}`, Math.floor(Math.random() * 20) + 0.99, `No image found for product with id ${i}`, `abc${i}`, Math.floor(Math.random() * 50) + 1);
  };
};

createRandomProductList(10);