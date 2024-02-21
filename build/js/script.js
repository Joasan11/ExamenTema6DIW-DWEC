document.addEventListener('DOMContentLoaded', function(){
    iniciarApp()
    scrollNow()
});

function iniciarApp(){
    crearGaleria();

    let yearSpan = document.getElementById("year");
    let currentYear = new Date().getFullYear();

    yearSpan.textContent = currentYear;
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement("img");
        const imageName = `${i}.jpg`;

        const extensiones = ['webp', 'jpeg', 'jpg'];
        for (const ext of extensiones) {
            const src = `build/img/pequeña/${i}.${ext}`;
            if (imagenExiste(src)) {
                imagen.src = src;
                break;
            }
        }

        imagen.alt = "imagen galeria";
        imagen.loading = "lazy";

        (function (indice) {
            imagen.onclick = function () {
                mostrarImagen(indice);
            };
        })(i);

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(){

}

function imagenExiste(src) {
    const http = new XMLHttpRequest();
    http.open('HEAD', src, false);
    http.send();
    return http.status !== 404;
}

function scrollNow() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();

            const scroll = e.target.attributes.href.value;
            const seccion = document.querySelector(scroll);

            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}