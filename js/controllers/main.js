import { servicesProduct } from '../service/product.service.js';

// Seleccionamos el contenedor de productos, el formulario y el botón de limpiar
const productContainer = document.querySelector('[data-product]');
const form = document.querySelector('[data-form]');
const clearButton = document.getElementById('button-clear');

// Función para crear una tarjeta de producto
function createCard(name, price, image, id) {
  const card = document.createElement('div');
  card.classList.add('card');

  // Estructura HTML de la tarjeta de producto
  card.innerHTML = `  
    <div class="img-container">
      <img src="${image}" alt="${name}">
    </div>
    <div class="card-container--info">
      <p>${name}</p>
      <div class="card-container--value">
        <p>$ ${price}</p>
        <button class="delete-button" data-id="${id}">
          <img src="assets/delete.svg" alt="Eliminar">
        </button>
      </div>
    </div>`;

  // Añadimos el evento de eliminación al botón
  card
    .querySelector('.delete-button')
    .addEventListener('click', async (event) => {
      const id = event.target.closest('.delete-button').dataset.id;
      try {
        await servicesProduct.deleteProduct(id);
        card.remove();
      } catch (error) {
        console.log(error);
      }
    });

  productContainer.appendChild(card);
  return card;
}

// Función para renderizar los productos
const render = async () => {
  try {
    const listProducts = await servicesProduct.productList();
    listProducts.forEach((product) => {
      productContainer.appendChild(
        createCard(product.name, product.price, product.image, product.id)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

// Evento para manejar la sumisión del formulario
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('[data-name]').value;
  const price = document.querySelector('[data-price]').value;
  const image = document.querySelector('[data-image]').value;

  try {
    await servicesProduct.createProduct(name, price, image);
    // Limpia los inputs después de enviar el formulario
    document.querySelector('[data-name]').value = '';
    document.querySelector('[data-price]').value = '';
    document.querySelector('[data-image]').value = '';
    // Renderiza nuevamente los productos
    render();
  } catch (error) {
    console.log(error);
  }
});

// Evento para manejar el botón de limpiar
clearButton.addEventListener('click', () => {
  document.querySelector('[data-name]').value = '';
  document.querySelector('[data-price]').value = '';
  document.querySelector('[data-image]').value = '';
});

// Llamamos a la función para renderizar los productos al cargar la página
render();
