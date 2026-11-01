const BANCO_TARJETAS = [{
        id: 1,
        pregunta: "¿Qué es la diferencia entre var, let, y const?",
        respuesta: "En JavaScript, var es function-scoped y puede ser re-declarado; let y const son block-scoped, con let permitiendo re-asignación y const previniéndola.",
        nivel: "basico"
    },
    {
        id: 2,
        pregunta: "¿Qué es un Closure en JavaScript?",
        respuesta: "Es una función que recuerda y accede a las variables de su ámbito exterior incluso cuando esa función externa ya ha terminado de ejecutarse.",
        nivel: "intermedio"
    },
    {
        id: 3,
        pregunta: "¿Cómo funciona el Event Loop?",
        respuesta: "Coordina la ejecución del código, gestionando la pila de llamadas (Call Stack) y las colas de tareas asincrónicas.",
        nivel: "avanzado"
    },
    {
        id: 4,
        pregunta: "¿Qué es una Promesa (Promise)?",
        respuesta: "Un objeto que representa la eventual finalización o fallo de una operación asincrónica.",
        nivel: "intermedio"
    },
    {
        id: 5,
        pregunta: "¿Qué es la coerción de tipos?",
        respuesta: "Es la conversión automática o implícita de un tipo de dato a otro realizada por JavaScript.",
        nivel: "basico"
    }
];

let inventarioTarjetas = JSON.parse(localStorage.getItem('tarjetas_minimal')) || BANCO_TARJETAS;
let indiceActual = 0;
let estaMostrandoRespuesta = false;

// Referencias del DOM
const textoContenido = document.getElementById('textoContenido');
const etiquetaNivel = document.getElementById('etiquetaNivel');
const barraProgreso = document.getElementById('barraProgreso');
const porcentajeProgreso = document.getElementById('porcentajeProgreso');
const textoContador = document.getElementById('textoContador');

const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
const botonVoltear = document.getElementById('botonVoltear');

const botonTema = document.getElementById('botonTema');
const botonNuevo = document.getElementById('botonNuevo');
const modalFormulario = document.getElementById('modalFormulario');
const botonCerrarModal = document.getElementById('botonCerrarModal');
const botonCancelarModal = document.getElementById('botonCancelarModal');
const formularioTarjeta = document.getElementById('formularioTarjeta');

function renderizar() {
    const total = inventarioTarjetas.length;
    if (total === 0) {
        textoContenido.textContent = "No hay tarjetas disponibles.";
        etiquetaNivel.style.display = 'none';
        return;
    }

    const tarjetaActual = inventarioTarjetas[indiceActual];

    if (estaMostrandoRespuesta) {
        textoContenido.textContent = tarjetaActual.respuesta;
        botonVoltear.textContent = "Ocultar Respuesta";
        etiquetaNivel.style.display = 'none';
    } else {
        textoContenido.textContent = tarjetaActual.pregunta;
        botonVoltear.textContent = "Mostrar Respuesta";
        etiquetaNivel.style.display = 'block';
        etiquetaNivel.textContent = tarjetaActual.nivel;
        etiquetaNivel.className = `insignia insignia-${tarjetaActual.nivel}`;
    }

    // Actualizar barra de progreso y contadores
    const porcentaje = Math.round(((indiceActual + 1) / total) * 100);
    barraProgreso.style.width = `${porcentaje}%`;
    porcentajeProgreso.textContent = `${porcentaje}%`;
    textoContador.textContent = `${indiceActual + 1} de ${total}`;
}

// Eventos de Navegación
botonSiguiente.addEventListener('click', () => {
    estaMostrandoRespuesta = false;
    indiceActual = (indiceActual + 1) % inventarioTarjetas.length;
    renderizar();
});

botonAnterior.addEventListener('click', () => {
    estaMostrandoRespuesta = false;
    indiceActual = (indiceActual - 1 + inventarioTarjetas.length) % inventarioTarjetas.length;
    renderizar();
});

botonVoltear.addEventListener('click', () => {
    estaMostrandoRespuesta = !estaMostrandoRespuesta;
    renderizar();
});

// Modal y Tema
botonNuevo.addEventListener('click', () => modalFormulario.classList.remove('oculto'));
botonCerrarModal.addEventListener('click', () => modalFormulario.classList.add('oculto'));
botonCancelarModal.addEventListener('click', () => modalFormulario.classList.add('oculto'));

formularioTarjeta.addEventListener('submit', (e) => {
    e.preventDefault();
    const nueva = {
        id: Date.now(),
        pregunta: document.getElementById('campoPregunta').value,
        respuesta: document.getElementById('campoRespuesta').value,
        nivel: document.getElementById('campoNivel').value
    };

    inventarioTarjetas.push(nueva);
    localStorage.setItem('tarjetas_minimal', JSON.stringify(inventarioTarjetas));
    formularioTarjeta.reset();
    modalFormulario.classList.add('oculto');
    indiceActual = inventarioTarjetas.length - 1;
    estaMostrandoRespuesta = false;
    renderizar();
});

botonTema.addEventListener('click', () => {
    const esOscuro = document.body.getAttribute('data-tema') === 'oscuro';
    if (esOscuro) {
        document.body.removeAttribute('data-tema');
        botonTema.textContent = 'Tema';
    } else {
        document.body.setAttribute('data-tema', 'oscuro');
        botonTema.textContent = 'Tema';
    }
});

// Inicialización
renderizar();