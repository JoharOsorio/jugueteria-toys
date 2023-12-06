
const tbody = document.querySelector('#tbodyCarrito');
let carrito = []
//console.log(tbody);

function addItemCarrito(newItem) {
  const alert = document.querySelector('.alert');

  alert.style.display = 'block';

  setTimeout(() => {
    alert.style.display = 'none';
  }, 2000);

  const existingItem = carrito.find(item => item.title.trim() === newItem.title.trim());

  if (existingItem) {
    existingItem.cantidad++;
  } else {
    carrito.push(newItem);
  }

  renderCarrito();
}


function renderCarrito() {
  tbody.innerHTML = ''; // Limpiamos el contenido actual del tbody antes de agregar elementos

  carrito.forEach(item => {
    const tr = document.createElement('tr');
    tr.classList.add('ItemCarrito');
    
    tr.innerHTML = `
      <th scope="row">1</th>
      <td class="table__productos">
        <img src="${item.img}" alt="">
        <h6 class="title">${item.title}</h6>
      </td>
      <td class="table__price"><p>${item.precio}</p></td>
      <td class="table__cantidad">
        <input type="number" min="1" value="${item.cantidad}" class="input__elemento">
        <button class="delete btn btn-danger">x</button>
      </td>
    `;
    
    tbody.appendChild(tr);

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito);
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad);
  });

  CarritoTotal();
}


function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
      break;
    }
  }

  const alert = document.querySelector('.remove');

  alert.style.display = 'block';

  setTimeout(() => {
    alert.style.display = 'none';
  }, 2000);

  tr.remove();
  CarritoTotal();
}



function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

document.addEventListener('DOMContentLoaded', () => {
  tbody.addEventListener('click', (event) => {
    if (event.target.classList.contains('button')) {
      const item = event.target.closest('.card');
      const itemTitle = item.querySelector('.card-title').textContent;
      const itemPrice = item.querySelector('.precio').textContent;
      const itemImg = item.querySelector('.card-img-top').src;

      const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
      }

      addItemCarrito(newItem);
    }

    if (event.target.classList.contains('delete')) {
      removeItemCarrito(event);
    }
  });

  tbody.addEventListener('change', (event) => {
    if (event.target.classList.contains('input__elemento')) {
      sumaCantidad(event);
    }
  });

  // Cargar datos del carrito desde el almacenamiento local después de cargar la página
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
});