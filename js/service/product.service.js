// Obtiene la lista de productos desde el servidor
const productList = async () => {
  try {
    const res = await fetch('http://localhost:3000/products');
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

// Crea un nuevo producto en el servidor
const createProduct = async (name, price, image) => {
  try {
    const res = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, image }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

// Elimina un producto del servidor
const deleteProduct = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

// Exporta las funciones del servicio de productos
export const servicesProduct = {
  productList,
  createProduct,
  deleteProduct,
};
