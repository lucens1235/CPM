"use strict";

/* =========================
   ReqJ1 – Estructura defensiva
   ========================= */
var form = document.getElementById("mainForm");
if (!form) {
  // Si no hay formulario en la página, no hacemos nada
  console.warn("Formulario no encontrado. Script detenido.");
} else {

  var previewBox = document.getElementById("previewBox");
  var errorBox = document.getElementById("errorBox");

  /* =========================
     ReqJ2 – Vista previa dinámica
     ========================= */
  
function updatePreview() {
  var previewBox = document.getElementById("previewBox");
  if (!previewBox) return;

  var nombre  = document.getElementById("nombre").value;
  var email   = document.getElementById("email").value;
  var tel     = document.getElementById("tel").value;
  var mensaje = document.getElementById("mensaje").value;

  previewBox.innerHTML = `
    <h3>Vista previa del formulario</h3>
    <p><strong>Nombre:</strong> ${nombre || "-"}</p>
    <p><strong>Email:</strong> ${email || "-"}</p>
    <p><strong>Teléfono:</strong> ${tel || "-"}</p>
    <p><strong>Equipo favorito:</strong> ${mensaje || "-"}</p>
  `;
}

  

  /* =========================
     ReqJ3 – Estados visuales de validez
     ========================= */
  function checkValidityState(input) {
    if (input.checkValidity()) {
      input.classList.remove("invalid");
      input.classList.add("valid");
    } else {
      input.classList.remove("valid");
      input.classList.add("invalid");
    }
  }

  /* =========================
     ReqJ5 – Reglas personalizadas
     ========================= */
  function checkCustomRules() {
    if (!errorBox) return true;

    errorBox.textContent = "";
    errorBox.style.display = "none";

    var email = form.elements["email"];
    var message = form.elements["message"];

    if (email.value.includes("@spam.com")) {
      errorBox.textContent = "No se permiten correos de @spam.com";
      errorBox.style.display = "block";

      /* =========================
         ReqJ6 – Gestión del foco
         ========================= */
      email.focus();
      return false;
    }

    if (message.value.length < 10) {
      errorBox.textContent = "El mensaje debe tener al menos 10 caracteres.";
      errorBox.style.display = "block";
      message.focus();
      return false;
    }

    return true;
  }

  /* =========================
     ReqJ4 – Validación nativa
     ========================= */
  function validateForm() {
    if (!form.checkValidity()) {
      return false;
    }

    if (!checkCustomRules()) {
      return false;
    }

    return true;
  }

  /* =========================
     ReqJ7 – Interacción con teclado
     ========================= */
  function handleKey(event, el) {
    if (event.key === "Enter") {
      el.style.backgroundColor = "#e0f7fa";
    }
  }

  /* =========================
     ReqJ8 – Interacción con ratón
     ========================= */
  function handleMouseOver(el) {
    el.style.borderColor = "blue";
  }

  function handleMouseOut(el) {
    el.style.borderColor = "";
  }

  /* Exponer funciones al HTML */
  window.updatePreview = updatePreview;
  window.checkValidityState = checkValidityState;
  window.validateForm = validateForm;
  window.handleKey = handleKey;
  window.handleMouseOver = handleMouseOver;
  window.handleMouseOut = handleMouseOut;
}