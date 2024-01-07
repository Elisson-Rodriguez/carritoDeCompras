//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

registrarEventListeners();
function registrarEventListeners() {
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    })
}

//functions
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = (e.target.parentElement.parentElement);
        leerDatosCurso(cursoSeleccionado);
    }

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    
}

//vaciar el carrito
function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML(); //iteramos sobre el carrito y eliminamos su html        
    }
}

// Agregar evento para eliminar curso
carrito.addEventListener('click', eliminarCurso);

// Agregar evento para disminuir cantidad
contenedorCarrito.addEventListener('click', disminuirCantidad);

function disminuirCantidad(e) {
    if (e.target.classList.contains('disminuir-cantidad')) {
        const cursoId = e.target.closest('tr').getAttribute('data-id');
        const cursoEnCarrito = articulosCarrito.find(curso => curso.id === cursoId);

        if (cursoEnCarrito && cursoEnCarrito.cantidad > 1) {
            cursoEnCarrito.cantidad--;
            carritoHTML();
        } else if (cursoEnCarrito && cursoEnCarrito.cantidad === 1) {
            // Si la cantidad es 1, eliminar el curso del carrito
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
            carritoHTML();
        }
    }
}
function carritoHTML() {
    // ... (código existente)

    // Agregar botón de disminuir cantidad
    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.classList.add('disminuir-cantidad');
    decrementButton.setAttribute('data-id', id);

    // Agregar el botón de disminuir cantidad al último td
    row.lastChild.appendChild(decrementButton);
}

//lee el contenido del html y extrae la información del curso
function leerDatosCurso(curso) {

    //objeto con el contenido del curso.
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];

    } else {
        //agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }

    console.log(articulosCarrito);
    carritoHTML();
}

//muestra el carrito de compras en el html
function carritoHTML() {
    //limpiar html
    limpiarHTML();
    articulosCarrito.forEach(curso => {
        const { imagen, precio, titulo, cantidad, id } = curso;

        //recorre el html y agrega cursos
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="150">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        //agrega el html de carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//limpiar los cursos del tbody
function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
