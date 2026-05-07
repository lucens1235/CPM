// --- CONFIGURACIÓN: páginas que quieres que el buscador recorra ---
const paginas = [
    { title: "Inicio", url: "index.html" },
    { title: "Equipos", url: "equipos.html" },
    { title: "Contacto", url: "contacto.html" }
];

// --- FUNCIÓN: cargar contenido de cada página ---
async function cargarContenido(url) {
    const respuesta = await fetch(url);
    const texto = await respuesta.text();

    // Extrae solo el contenido visible (sin etiquetas)
    const div = document.createElement("div");
    div.innerHTML = texto;
    return div.innerText.toLowerCase();
}

// --- FUNCIÓN: preparar índice de búsqueda ---
async function prepararIndice() {
    const indice = [];

    for (const pagina of paginas) {
        const contenido = await cargarContenido(pagina.url);
        indice.push({
            title: pagina.title,
            url: pagina.url,
            content: contenido
        });
    }

    return indice;
}

// --- INICIALIZACIÓN ---
let indiceBusqueda = [];

prepararIndice().then(indice => {
    indiceBusqueda = indice;
});

// --- EVENTO: búsqueda en tiempo real ---
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search");
    const resultadosDiv = document.getElementById("resultados");

    input.addEventListener("keyup", function () {
        const query = this.value.toLowerCase();

        if (query.length < 2) {
            resultadosDiv.innerHTML = "";
            return;
        }

        const resultados = indiceBusqueda.filter(item =>
            item.content.includes(query) ||
            item.title.toLowerCase().includes(query)
        );

        resultadosDiv.innerHTML = resultados.length
            ? resultados.map(r => `<p><a href="${r.url}">${r.title}</a></p>`).join("")
            : "<p>No se encontraron resultados.</p>";
    });
});
