"use strict";

/* ReqI18N1 – Estructura defensiva */
if (typeof TRANSLATIONS === "undefined") {
  console.warn("Diccionario de traducciones no encontrado");
} else {

  var DEFAULT_LOCALE = "es";

  function getSavedLocale() {
    return localStorage.getItem("locale") || DEFAULT_LOCALE;
  }

  function saveLocale(locale) {
    localStorage.setItem("locale", locale);
  }

  /* ReqI18N4 – Aplicar traducciones */
  function applyTranslations(locale) {
    var elements = document.querySelectorAll("[data-i18n]");
    if (!elements.length) return;

    elements.forEach(function (el) {
      var key = el.dataset.i18n;
      if (TRANSLATIONS[locale][key]) {
        el.textContent = TRANSLATIONS[locale][key];
      }
    });

    /* ReqI18N5 – Atributos */
    var placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(function (el) {
      var key = el.dataset.i18nPlaceholder;
      el.setAttribute("placeholder", TRANSLATIONS[locale][key]);
    });

    document.documentElement.lang = locale;
  }

  /* ReqI18N7 – Intl */
  function applyIntl(locale) {
    var dateEl = document.querySelector("[data-date]");
    var priceEl = document.querySelector("[data-price]");
    if (!dateEl || !priceEl) return;

    var date = new Date(dateEl.dataset.date);
    var price = Number(priceEl.dataset.price);

    var fDate = new Intl.DateTimeFormat(locale).format(date);
    var fPrice = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: locale === "es" ? "EUR" : "USD"
    }).format(price);

    var dynamic = document.getElementById("dynamicContent");
    if (dynamic) {
      dynamic.textContent =
        TRANSLATIONS[locale]["dynamic.summary"]
          .replace("{date}", fDate)
          .replace("{price}", fPrice);
    }
  }

  /* ReqI18N6 – Selector idioma */
  function changeLanguage(locale) {
    saveLocale(locale);
    applyTranslations(locale);
    applyIntl(locale);
  }

  window.changeLanguage = changeLanguage;

  /* Inicialización */
  var locale = getSavedLocale();
  applyTranslations(locale);
  applyIntl(locale);
}