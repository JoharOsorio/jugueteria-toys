async function fetchAndDisplayProducts() {
  try {
    const response = await fetch('http://127.0.0.1:3001/products');
    const products = await response.json();
    const productList = document.getElementById('productList');

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('col', 'd-flex', 'justify-content-center', 'mb-4');

      productCard.innerHTML = `
        <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
          <h5 class="card-title pt-2 text-center text-primary">${product.name}</h5>
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <p class="card-text text-white-50 description">${product.description}</p>
            <h5 class="text-primary">Precio: <span class="precio">$ ${product.price}</span></h5>
            <div class="d-grid gap-2">
              <button class="btn btn-primary button">Lo quiero!</button>
            </div>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
      const button = productCard.querySelector('.button');
      button.addEventListener('click', () => {
        const item = button.closest('.card');
        const itemTitle = item.querySelector('.card-title').textContent;
        const itemPrice = item.querySelector('.precio').textContent;
        const itemImg = item.querySelector('.card-img-top').src;

        const newItem = {
          title: itemTitle,
          precio: itemPrice,
          img: itemImg,
          cantidad: 1
        }

        addItemCarrito(newItem)
      });
    });
  } catch (error) {
    console.error('Error fetching or displaying products:', error);
  }
}

fetchAndDisplayProducts();
