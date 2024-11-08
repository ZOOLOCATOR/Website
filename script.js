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

var header = document.querySelector('header');
mostrarTextoGradualmente(header.querySelector('#texto-escrito'));


function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}


