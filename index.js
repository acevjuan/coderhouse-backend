// Creando clase ProductManager.
class ProductManager {
  // El constructor genera un arreglo vacío.
  constructor() {
    this.product = [];
  };
  
  // Agrega un producto a arreglo de productos. Valida que no existan productos repetidos y que todos los campos sean obligatorios. Igualmente, genera un id autoincrementable para cada nuevo producto agregado.
  addProduct(title, description, price, thumbnail, code, stock) {
    // Validación de que todos los campos sean diligenciados.
    if (title === "" || description === "" || price === "" || thumbnail === "" || code === "" || stock === "") {
      console.log("Not enough information to create a new product.");
    } else {
      // Validación de que no existan propiedades "code" iguales.
      // Verificación de que el arreglo ya cuente con productos agregados y que se realice la verificación de "code".
      if (!this.product.length == 0) {
        const codeToCompare = this.product.find(element => element.code === code);
        if (!codeToCompare) {
          // Crea y agrega nuevo producto al arreglo.
          this.product.push({id: this.product.length + 1, title, description, price, thumbnail, code, stock});
        } else {
          // En caso de que ya exista el mismo "code", notificará al usuario del error y detendrá la creación de nuevo producto.
          console.log("Error. There is already a product with the same code.");
        };
      } else {
        this.product.push({id: this.product.length + 1, title, description, price, thumbnail, code, stock});
      };
    };
  };
  
  // Devuelve arreglo con productos agregados.
  getProducts() {
    return this.product;
  };
  
  // Busca arreglo a través del id suministrado por el usuario.
  // Devuelve error en caso de que el id no exista.
  getProductById(id) {
    // Validación de que existan productos agregados. En caso que no, notificará al usuario.
    if (this.product.length === 0) {
      console.log("List is empty. Can't get any product by id");
    } else {
      // Procede a buscar el id suministrado por el usuario.
      const idToFind = this.product.find(element => element.id === id);
      // Si el id suministrado por el usuario existe, se devolverá un objeto con el producto deseado.
      if (idToFind) {
        console.log(this.product[id - 1]);
        return this.product[id - 1];
      } else {
        // Si no existe el arreglo, se notificará al usuario por medio de un error.
        console.log(`Not found. There is no product with id ${id}`);
      };
    };
  };

  // Actualiza información del producto indicada por el usuario proporcionando el id.
  updateProduct(id, toUpdate, newValue) {
    if (toUpdate === 'title' || toUpdate === 'description' || toUpdate === 'price' || toUpdate === 'thumbnail' || toUpdate === 'stock') {
      this.product[id - 1][toUpdate] = newValue;
      console.log("Info was succesfully updated.");
    } else {
      if (toUpdate === 'code') {
        console.log("Code can't be updated.");
      } else {
        console.log("Info to update do not exist.");
      }
    };
  };

    // Elimina un producto del arreglo indicado por el usuario proporcionando el id.
  deleteProduct(id) {
    this.product.splice(id - 1, 1);
    console.log(`Product with id number ${id} was succesfully deleted.`);
  };

};

// Testing

// Creando instancia de la clase ProductoManager
const testingProduct = new ProductManager();

// Probando método getProducts
let productList = testingProduct.getProducts();
console.log("Devuelve un arreglo vacío.");
console.log(productList);

// Probando método addProducto
testingProduct.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productList = testingProduct.getProducts();
console.log("Devuelve arreglo con producto recién creado con id = 1.");
console.log(productList);
console.log("Se agrega un producto exactamente igual para probar que no el método addProducto no lo permite por tener el mismo code.");
testingProduct.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log("Se imprime nuevamente productList para demostrar que el arreglo no fue alterado.");
console.log(productList);
testingProduct.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc456", 25);
testingProduct.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc789", 25);
testingProduct.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "def123", 25);
console.log(productList);

// Probando método getProductById
let productById;
// En caso de no existir el id
productById = testingProduct.getProductById(2);
console.log(productById);
// En caso de existir el id
productById = testingProduct.getProductById(1);

testingProduct.updateProduct(1, 'cod', "123456789");
testingProduct.deleteProduct(4);
console.log(productList);