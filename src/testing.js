import { ProductManager } from './ProductManager.js';

// Testing

// Creando instancia de la clase ProductoManager
const testingProduct = new ProductManager();

// Probando método getProducts
let productList = testingProduct.getProducts();
console.log("Devuelve un arreglo vacío.");
console.log(productList);

// Probando método addProducto
testingProduct.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log("Devuelve arreglo con producto recién creado con id = 1.");
// Agragamos más productos para continuar el testeo.
testingProduct.addProduct("producto prueba 2", "Este es un producto prueba", 200, "Sin imagen", "abc456", 25);
testingProduct.addProduct("producto prueba 3", "Este es un producto prueba", 200, "Sin imagen", "abc789", 25);
testingProduct.addProduct("producto prueba 4", "Este es un producto prueba", 200, "Sin imagen", "def123", 25);
productList = testingProduct.getProducts();
console.log(productList);

// Probando método getProductById
let productById;
// En caso de no existir el id
productById = testingProduct.getProductById(5);
// En caso de existir el id
productById = testingProduct.getProductById(1);

// Probando método updateProduct
// Prueba con titulo de producto con id = 3. Argumentos: (id del producto que se desa modificar, nombre de la propiedad a modificar, nuevo valor para dicha propiedad)
productById = testingProduct.updateProduct(3, 'title', 'titulo modificado');
// El titulo debe ser ahora 'titulo modificado' y su id debe permanecer intacto.
console.log(testingProduct.getProducts());

// Probando método deleteProduct
// En caso de no existir el id
productById = testingProduct.deleteProduct(5);
// En caso de existir el id
productById = testingProduct.deleteProduct(2);
console.log(testingProduct.getProducts());