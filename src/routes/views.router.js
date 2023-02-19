import { Router } from "express";
import * as fs from 'fs';

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

router.get('/realtimeproducts', (request, response) => {
  response.render('realTimeProducts');
});

router.get('/', (request, response) => {
  response.render('index', { products: productsDb });
});

export default router;