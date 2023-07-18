document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}
//Fijar el header
function navegacionFija() {
    const barra = document.querySelector('.header');//Seleccionar header
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function() {
        if( sobreFestival.getBoundingClientRect().bottom < 0  ) {//cuando llega al elemento (Sobre Festival) se ejecuta la función
            barra.classList.add('fijo');//fijo el elemento
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

//Función para que el scroll hacía las secciones no se haga de manera brusca
function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( enlace => {//itera en cada enlace
        enlace.addEventListener('click', function(e) {//Escucha por un click y ejecuta la función
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;//llama al valor del href (enlace)
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth"});
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++ ) {//Recorre la cantidad de imágenes que tenemos
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function() {//al hacer click en la imagen esta se muestra
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}  


function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {//CAllback para que se cierre la modal cuando hago click uera de ella
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');//mata la clase, por así decirlo
        overlay.remove();
    }

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {//callback
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');//Con remove le decimos que Se elimina la clase cuando se cierra la ventana modal, 
                                            //para que se pueda hacer scroll a la página una vez finalizado
        overlay.remove();//cierra la imagen
    }
    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');//Quita el scroll del fondo de la página principal
}