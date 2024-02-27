//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Eliminar cursos del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        // Buscamos el curso en el carrito por su id
        const cursoEnCarrito = articulosCarrito.find((curso) => curso.id === cursoId);

        if (cursoEnCarrito) {
            // Si la cantidad es mayor a 1, simplemente disminuimos la cantidad
            if (cursoEnCarrito.cantidad > 1) {
                cursoEnCarrito.cantidad--;
            } else {
                // Si la cantidad es 1 o menos, eliminamos el curso del carrito
                articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
            }
            
            carritoHTML(); // volvemos a iterar sobre el carrito y mostrar su HTML
        }
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la información del curso.
function leerDatosCurso(curso) {
    //creamos un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                // Creamos un nuevo objeto con la cantidad actualizada
                return {
                    ...curso,
                    cantidad: curso.cantidad + 1,
                };
            } else {
                return curso; // Retornamos los objetos que no son duplicados.
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad, id } = curso;
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//elimina los cursos del tbody
function limpiarHTML() {
    /* 
     * Forma menos optima de como limpiar el carrito.
     * contenedorCarrito.innerHTML = '';
     * Forma mas avanzada de limpiar el carrito.
     * Esta forma contrae temas de optimizacion de página utilizando bucles:
    */
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}