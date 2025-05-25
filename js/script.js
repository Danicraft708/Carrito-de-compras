// Crea un arreglo con los productos que se mostrarán en la tienda
const productos = 
[
  
  {
    id: 1,
    nombre: "celular xiaomi redmi note 13 256gb 4g",
    precio: 678900,
    imagen: "img/Redmi.jpeg",
    calificacion: 5
  },

  {
    id: 2,
    nombre: "celular motorola moto g85 512gb 5g",
    precio: 1094900,
    imagen: "img/Moto.jpeg",
    calificacion: 4
  },

  {
    id: 3,
    nombre: "celular samsung galaxy a16 256gb 5g",
    precio: 799900,
    imagen: "img/Galaxy.jpeg",
    calificacion: 5
  },

  {
    id: 4,
    nombre: "celular oppo a80 256gb 5g",
    precio: 1094900,
    imagen: "img/Oppo.jpeg",
    calificacion: 4
  },

  {
    id: 5,
    nombre: "Celular Realme Note 50",
    precio: 379900,
    imagen: "img/Realme.jpeg",
    calificacion: 3.5
  },

  {
    id: 6,
    nombre: "Celular Zte Nubia Neo 2 256Gb 5G",
    precio: 799900,
    imagen: "img/ZTE.jpeg",
    calificacion: 4
  },

  {
    id: 7,
    nombre: "Celular Infinix Note 50 Pro 256gb 12GB Ram",
    precio: 1599900,
    imagen: "img/Infinity.jpeg",
    calificacion: 5
  },

  {
    id: 8,
    nombre: "Celular Honor X6b Plus 256gb",
    precio: 649900,
    imagen: "img/Honor.jpeg",
    calificacion: 4
  },

  {
    id: 9,
    nombre: "Celular Tecno Spark 20 Pro 5g 256gb",
    precio: 699900,
    imagen: "img/Tecno.jpeg",
    calificacion: 4
  },
];

// Declara una lista vacía que actuará como carrito de compras
let carrito = [];

function actualizarResumenCarrito() {
  const cantidad = carrito.length;
  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);

  document.getElementById("resumen-cantidad").textContent = `Productos: ${cantidad}`;
  document.getElementById("resumen-total").textContent = `Total: $${total.toLocaleString()}`;
}

// Función que se ejecuta automáticamente cuando la página termina de cargar
window.onload = function() 
{
  // Busca el contenedor donde se insertarán los productos (por ID)
  const contenedor = document.getElementById("lista-productos");

  // Recorre cada producto y genera su tarjeta visual en HTML
  productos.forEach(producto => 
  {  
    // Inserta la estructura HTML dentro del contenedor
    contenedor.innerHTML += `
     <div class="col-md-4">
       <div class="card">
         <!-- Imagen del producto -->
         <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">

         <div class="card-body">
           <!-- Título con el nombre del producto -->
           <h5 class="card-title">${producto.nombre}</h5>

           <!-- Mostrar estrellas de calificación con estilo visual -->
           <div>${obtenerEstrellas(producto.calificacion)}</div>

           <!-- Mostrar el precio con separador de miles -->
           <p class="card-text">$${producto.precio.toLocaleString('es-CO')}</p>

           <!-- Botón que llama a la función para agregar al carrito -->
           <button class="btn btn-success" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
         </div>
       </div>
     </div>
    `;
  });

  // Crea el contador visual de productos en carrito (esquina superior)
  crearContadorVisual();

  // Llama a la función que cuenta y guarda el número de visitas
  contarVisitas();
};

// Función para agregar un producto al carrito de compras
function agregarAlCarrito(productoId) {
  // Busca el producto por su ID en el arreglo de productos
  const productoSeleccionado = productos.find(p => p.id === productoId);

  // Agrega el producto al arreglo carrito
  carrito.push(productoSeleccionado);

  // Muestra una alerta confirmando la acción
  alert(`${productoSeleccionado.nombre} ha sido agregado al carrito.`);

  // Actualiza el contador visual del carrito
  actualizarContador();

  // Actualiza el resumen del carrito (cantidad y total)
  actualizarResumenCarrito();
}


// Función que crea un cuadro flotante con el número de productos en el carrito
function crearContadorVisual() 
{
  // Selecciona el elemento <body> del documento
  const body = document.querySelector("body");

  // Inserta un bloque HTML con el contador en la esquina superior derecha
  body.innerHTML += `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background-color:#c0392b;
      color: white;
      padding: 10px 15px;
      border-radius: 10px;
      z-index: 1000;
    ">
      Carrito: <span id="contador-carrito">0</span> productos
    </div>
  `;
}

// Función que actualiza el número visual del carrito
function actualizarContador() 
{
  // Muestra cuántos productos hay en el carrito dentro del contador
  document.getElementById("contador-carrito").innerText = carrito.length;
}

// Función para contar cuántas veces se ha visitado el sitio (usando localStorage)
function contarVisitas() 
{
  // Recupera el valor de visitas desde localStorage
  let visitas = localStorage.getItem("visitas");

  // Si es la primera vez, inicia en 1
  if (!visitas) 
  {
    visitas = 1;
  } 
  else 
  {
    // Si ya hay visitas, las convierte a número y suma 1
    visitas = parseInt(visitas) + 1;
  }

  // Guarda nuevamente el valor actualizado en localStorage
  localStorage.setItem("visitas", visitas);

  // Muestra el número de visitas en la consola del navegador
  console.log("Número de visitas al sitio:", visitas);
}

// Función que genera 5 estrellas visuales según la calificación del producto
function obtenerEstrellas(calificacion) 
{
  // Variable que almacenará las estrellas en formato HTML
  let estrellasHTML = "";

  // Recorre del 1 al 5 para generar 5 estrellas siempre
  for (let i = 1; i <= 5; i++) 
  {
    if (i <= calificacion) 
    {
      // Si está dentro del rango de calificación, estrella amarilla
      estrellasHTML += '<span style="color: gold;">⭐</span>';
    } 
    else 
    {
      // Si no, estrella gris sin calificación
      estrellasHTML += '<span style="color: lightgray;">★</span>';
    }
  }

  // Devuelve el conjunto de estrellas como HTML para insertar
  return estrellasHTML;
}

