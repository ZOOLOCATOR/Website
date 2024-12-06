 function mostrarTextoGradualmente(elemento) {
  var textoCompleto = elemento.textContent;
  elemento.textContent = ''; 
  var i = 0;
  var intervalo = setInterval(function() {
      if (i < textoCompleto.length) {
          elemento.textContent += textoCompleto.charAt(i);
          i++;
      } else {
          clearInterval(intervalo);
      }
  }, 100); 
}

// Agregar en tu archivo scripts.js
function openUserLoginModal() {
    const userLoginModal = new bootstrap.Modal(document.getElementById('userLoginModal'));
    userLoginModal.show();
}

function closeModal(modalId) {
    const modalElement = document.getElementById(modalId);

    if (modalElement) {
        // Retira el foco del elemento activo
        document.activeElement.blur();

        // Obtén la instancia del modal de Bootstrap y ciérralo
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    } else {
        console.error(`No se encontró el modal con el ID: ${modalId}`);
    }
}
function switchModal(closeModalId, openModalId) {
    closeModal(closeModalId); // Cerrar el modal activo
    const openModalElement = document.getElementById(openModalId);

    if (openModalElement) {
        const openModalInstance = bootstrap.Modal.getOrCreateInstance(openModalElement);
        openModalInstance.show(); // Abrir el nuevo modal
    } else {
        console.error(`No se encontró el modal con el ID: ${openModalId}`);
    }
}

const toggleButton = document.getElementById('toggleButton');

// Función para establecer el modo
function setMode(mode) {
    const body = document.body;
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(mode);
    localStorage.setItem('mode', mode); // Guardar el modo en localStorage
}

// Actualizar el texto del botón
function updateButtonText(mode) {
    const button = document.querySelector('.toggle-button');
    button.textContent = mode === 'dark-mode' ? '🌜' : '🌞'; // Cambiar ícono
    button.title = mode === 'dark-mode' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
}

// Función para alternar entre modos
function toggleMode() {
    const currentMode = localStorage.getItem('mode') || 'light-mode';
    const newMode = currentMode === 'light-mode' ? 'dark-mode' : 'light-mode';
    setMode(newMode);
    updateButtonText(newMode);
}

// Inicializar el modo al cargar la página
window.onload = function() {
    const savedMode = localStorage.getItem('mode') || 'light-mode';
    setMode(savedMode);
    updateButtonText(savedMode);
};

// Agregar evento al botón
toggleButton.addEventListener('click', toggleMode);
        

function addToCart(productName, price, imageUrl) {
    // Obtener el cuerpo de la tabla del carrito
    const cartTbody = document.getElementById('cart-tbody');

    // Crear una nueva fila
    const newRow = document.createElement('tr');

    // Crear las celdas de la fila
    newRow.innerHTML = `
        <td><img src="${imageUrl}" alt="${productName}" style="width: 50px; height: auto;"></td>
        <td>${productName}</td>
        <td>$${price.toFixed(2)}</td>
        <td>
            <input type="number" value="1" min="1" style="width: 50px;">
        </td>
        <td>$${price.toFixed(2)}</td>
        <td>
            <button class="btn btn-danger" onclick="removeFromCart(this)">Eliminar</button>
        </td>
    `;

    // Añadir la nueva fila al cuerpo de la tabla
    cartTbody.appendChild(newRow);

    // Actualizar el total
    updateTotal();
}

// Función para eliminar un producto del carrito
function removeFromCart(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotal();
}

// Función para actualizar el total
function updateTotal() {
    const cartTbody = document.getElementById('cart-tbody');
    const rows = cartTbody.getElementsByTagName('tr');
    let total = 0;

    for (let row of rows) {
        const priceCell = row.cells[4].textContent;
        const price = parseFloat(priceCell.replace('$', ''));
        total += price;
    }

    document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
}      
    
let cart = [];

function addToCart(productName, price, imageUrl) {
    // Crear un objeto del producto
    const product = {
        name: productName,
        price: price,
        image: imageUrl,
        quantity: 1
    };

    // Agregar el producto al carrito
    cart.push(product);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartTbody = document.getElementById("cart-tbody");
    cartTbody.innerHTML = ""; // Limpiar el carrito

    let totalAmount = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        totalAmount += subtotal;

        const row = `
            <tr>
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" style="width: 50px;" onchange="updateQuantity(this, '${item.name}')">
                </td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart('${item.name}')">Eliminar</button>
                </td>
            </tr>
        `;
        cartTbody.innerHTML += row;
    });

    // Actualizar el total
    document.getElementById("total-amount").innerText = `$${totalAmount.toFixed(2)}`;
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
}

function updateQuantity(input, productName) {
    const newQuantity = parseInt(input.value);
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity = newQuantity;
        updateCartDisplay();
    }
}
