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






