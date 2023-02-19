// Importando librerías al pryecto (Express JS, Handlebars y Socket.io).
import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import * as fs from 'fs';

//Importando routers de products y carts.
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

// Incluyendo Express JS en el archivo app.js.
const app = express();

// Incluyendo middlewares express.json() y express.urlencoded().
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter);

// Llamando routers products y carts.
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Información del servidor.
const SERVER_PORT = 8080;

// Inicializando servidor.
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Listening server on port ${SERVER_PORT}`);
  console.log(`Root path: ${__dirname}`);
});


// Para esta entrega se decide traer la base de datos products.json al app.js para enviarla a servidor socket.io.

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

// Socket server
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  console.log('Cliente conectado');
  socket.emit('products', productsDb);
});
