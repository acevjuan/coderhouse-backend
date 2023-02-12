// Importando librerías Express JS.
import express from 'express';

//Importando routers de products y carts.
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

// Incluyendo Express JS.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Llamando routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Información del servidor.
const SERVER_PORT = 8080;

app.listen(SERVER_PORT, () => {
  console.log(`Listening server on port ${SERVER_PORT}`);
});