const socket = io();

const container = document.querySelector('.container');

socket.on('products', data => {
  console.log(data);
  container.innerHTML = "";
  data.forEach((element, index) => {
    let product = document.createElement('div');
    product.innerHTML = `
    <div>
      <h2>Title: ${element.title}</h2>
      <h3>Product id: ${element.id}</h2>
      <h3>Product code: ${element.code}</h2>
    </div>`
  container.appendChild(product);
  });
})