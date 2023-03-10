import * as fs from 'fs';

const fileSystem = fs;

// Creando clase ProductManager.
class ProductManager {
  #fileSystem;
  #path;
  #file;
  #productsListFile;
  // El constructor genera un arreglo vacío.
  constructor() {
    this.product = [];
    this.#fileSystem = fileSystem;
    this.#path = '../files';
    this.#file = this.#path + '/products.json';
    this.#productsListFile = new Array();
  };
  
  // Agrega un producto a arreglo de productos. Valida que no existan productos repetidos y que todos los campos sean obligatorios. Igualmente, genera un id autoincrementable para cada nuevo producto agregado.
  async addProduct(title, description, price, thumbnail, code, stock) {
    // Validación de que todos los campos sean diligenciados.
    if (title === "" || description === "" || price === "" || thumbnail === "" || code === "" || stock === "") {
      console.log("Not enough information to create a new product.");
    } else {
      let newProduct;
      // Validación de que no existan propiedades "code" iguales.
      // Verificación de que el arreglo ya cuente con productos agregados y que se realice la verificación de "code".
      if (!this.product.length == 0) {
        const codeToCompare = this.product.find(element => element.code === code);
        if (!codeToCompare) {
          // Crea y agrega nuevo producto al arreglo.
          newProduct = {id: this.product.length + 1, title, description, price, thumbnail, code, stock}
          this.product.push(newProduct);
        } else {
          // En caso de que ya exista el mismo "code", notificará al usuario del error y detendrá la creación de nuevo producto.
          console.log("Error. There is already a product with the same code.");
        };
      } else {
        newProduct = {id: this.product.length + 1, title, description, price, thumbnail, code, stock}
        this.product.push(newProduct);
      };
      // Interactuar con base de datos en json.
      try {
        // Crea directorio de archivos en caso de no existir.
        await this.#fileSystem.promises.mkdir(this.#path, { recursive: true });
        // Crea archivo json en caso que no exista + Sobreescribe información para actualizar base de datos cuando existan cambios en el arreglo del producto.
        await this.#fileSystem.promises.writeFile(this.#file, "[]");
        let productsFile = await this.#fileSystem.promises.readFile(this.#file, 'utf-8');
        this.#productsListFile = JSON.parse(productsFile);
        this.#productsListFile.push(...this.product);
        // Sobreescribe archivo json con información actualizada en arreglo de productos.
        await this.#fileSystem.promises.writeFile(this.#file, JSON.stringify(this.#productsListFile));
        // Atraba errores durante promesas.
      } catch(error) {
        console.log(error);
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
    // Validación de que existan productos agregados. En caso que no, notificará al usuario.
    if (this.product.length === 0) {
      console.log("List is empty. Can't update any product.");
    } else {
      // Procede a buscar el id suministrado por el usuario.
      const idToFind = this.product.find(element => element.id === id);
      // Si el id suministrado por el usuario existe, procederá a ejecutar la actualización de información.
      if (idToFind) {
        // Verifica que la información que desea modificar el usuario se válida, es decir, que la propiedad exista.
        if (toUpdate === 'title' || toUpdate === 'description' || toUpdate === 'price' || toUpdate === 'thumbnail' || toUpdate === 'stock') {
          // Actualiza información requerida por el usuario.
          this.product[id - 1][toUpdate] = newValue;
          console.log("Info was succesfully updated.");
        } else {
          // Impide modificación de code.
          if (toUpdate === 'code') {
            console.log("Code can't be updated.");
          } else {
            console.log("Info to update does not exist.");
          };
        };
      } else {
        // Si no existe el arreglo, se notificará al usuario por medio de un error.
        console.log(`There is no product with id ${id}`);
      };
    };
  };

    // Elimina un producto del arreglo indicado por el usuario proporcionando el id.
  deleteProduct(id) {
    // Validación de que existan productos agregados. En caso que no, notificará al usuario.
    if (this.product.length === 0) {
      console.log("List is empty. Can't delete any product.");
    } else {
      // Procede a buscar el id suministrado por el usuario.
      const idToFind = this.product.find(element => element.id === id);
      // Si el id suministrado por el usuario existe, se devolverá un objeto con el producto deseado.
      if (idToFind) {
        // Eliminación de producto.
        this.product.splice(id - 1, 1);
        console.log(`Product with id number ${id} was succesfully deleted.`);
      } else {
        // Si no existe el arreglo, se notificará al usuario por medio de un error.
        console.log(`There is no product with id ${id}`);
      };
    };
  };
};

export { ProductManager };