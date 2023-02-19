// Lado del cliente para renderización en tiempo real de listado de productos.
const socket = io();

const container = document.querySelector('.container');

socket.on('products', data => {
  console.log(data);
  container.innerHTML = `
    <h1>Listado de productos con Websockets</h1>
  `;
  data.forEach((element, index) => {
    let product = document.createElement('div');
    product.innerHTML = `
    <div id="product-${element.id}" class="container__producto">
      <h2 class"container__producto__title">Title: ${element.title}</h2>
      <p class"container__producto__code">Code: ${element.code}</p>
      <p class"container__producto__code">Description: ${element.description}</p>
      <p class"container__producto__code">Price: ${element.price}</p>
      <p class"container__producto__code">Stock: ${element.stock}</p>
    </div>`
  container.appendChild(product);
  });
});