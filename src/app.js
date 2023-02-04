import express from 'express';

const app = express();

app.get("/prueba", (request, response) => {
  response.send(`
      <h1>Prueba de respuesta</h1>
      <h2>Esto es una prueba</h2>
    `);
});

const SERVER_PORT = 8080;

app.listen(SERVER_PORT, () => {
  console.log(`Servidor escuchando por el puerto ${SERVER_PORT}`);
});