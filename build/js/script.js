document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
    scrollNow();
});

function iniciarApp(){
    crearGaleria();

    let yearSpan = document.getElementById("year");
    let currentYear = new Date().getFullYear();

    yearSpan.textContent = currentYear;
}

// Funcion para crear la galeria de imagenes
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

// Funcion para mostrar las imagenes de la galeria, y un boton X para dejar de verlas
function mostrarImagen(indice) {
    const imagen = document.createElement("img");
    const imageName = `${indice}.jpg`;

    const extensiones = ['webp', 'jpeg', 'jpg'];
    for (const ext of extensiones) {
        const src = `build/img/grande/${indice}.${ext}`;
        if (imagenExiste(src)) {
            imagen.src = src;
            break;
        }
    }

    imagen.alt = "imagen galeria";

    const overlay = document.createElement("div");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    overlay.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };

    const cerrarModal = document.createElement("p");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");
    cerrarModal.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };

    overlay.appendChild(cerrarModal);

    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
}

// Funcion para verificar si la imagen existe
function imagenExiste(src) {
    const http = new XMLHttpRequest();
    http.open('HEAD', src, false);
    http.send();
    return http.status !== 404;
}

// Funcion para un scroll suave
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