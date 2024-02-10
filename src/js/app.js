
let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion();//Muestra y oculta las secciones
    tabs();//Cambia la seccion cuando se presionen los tabs
    botonesPaginador();//Agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();

    consultarAPI(); //Consulta la API en el backend de PHP

    idCliente()//
    nombreCliente();//Añade el nombre del cliente
    seleccionarFecha(); //Añade la fecha de la cita en el objeto
    seleccionarHora(); //Añade la hora de cita en el objeto

    mostrarResumen();//Muestra el resumen de la cita

}

function mostrarSeccion() {
    //Ocultar la seccion anterior tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

    //Seleccionar la seccion con el paso...
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');


    //Quita la clase de actual al anterior
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }
    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button ');

    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            //console.log( parseInt(e.target.dataset.paso));
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();

        });
    })
}


function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaSiguiente() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    });
}

function paginaAnterior() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    });
}

async function consultarAPI() {

    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);

        //console.log(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;

        const nombreServicio = document.createElement('p');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('p');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function () {
            seleccionarServicios(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);


        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicios(servicio) {
    const { id } = servicio;
    const { servicios } = cita;

    //Identificar el elemento al cual se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //Comprobar si un servicio ya fue agregado
    if (servicios.some(agregado => agregado.id === id)) {
        //Eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        //Agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
    //console.log(cita);
}

function idCliente(){
    const id = document.querySelector('#id').value;
    cita.id = id;
}

function nombreCliente() {
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;

}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function (e) {

        cita.fecha = e.target.value; // Actualizar la fecha en el objeto cita
        nombreCliente(); // Actualizar el nombre cada vez que se seleccione una fecha

        const dia = new Date(e.target.value).getUTCDay();
        if ([6, 0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no hay atención', 'error', '.formulario');
        } else {
            //console.log("Corecto");
        }

    })
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function (e) {
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if (hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Hora no válida', 'error',
                '.formulario')
        } else {
            cita.hora = e.target.value;
        }
    })
}

function mostrarAlerta(mensaje, tipo, elmento, desaparece = true) {

    //Previene que se genera mas de una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    //Scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elmento);
    referencia.appendChild(alerta);

    if (desaparece) {
        //Eliminamos la alerta
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    //Limpiar el contenido de resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes('') || cita.servicios.length===0) {
        mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);

        return;
    }

    //Formatear el div de resumen 
    const {nombre, fecha, hora, servicios} = cita;

    //Heading para servicios de resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent= 'Resumen de servicios';
    resumen.appendChild(headingServicios);


    //Iterando y mostrando los servicios
    servicios.forEach(servicio =>{
        const {id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('p');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('p');
        precioServicio.innerHTML=`<span>Precio: </span> $${precio}`;
    
        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    //Heading para cita de resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent= 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('p');
    nombreCliente.innerHTML = `<span>Nombre: </span> ${nombre}`;

    //Formatear la fecha en español
    const fechaObj =  new Date(fecha);
    const mes =  fechaObj.getMonth(); // Eliminar "new" antes de fechaObj.getMonth()
    const dia =  fechaObj.getDate() + 2; // Eliminar "new" antes de fechaObj.getDate()
    const year =  fechaObj.getFullYear(); // Eliminar "new" antes de fechaObj.getFullYear()

    const fechaUTC = new Date(Date.UTC(year, mes, dia ));

    const opciones = {weekday: 'long', year:'numeric', month:'long', day:'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);

    //console.log(fechaFormateada);


    const fechaCita = document.createElement('p');
    fechaCita.innerHTML = `<span>Fecha: </span> ${fechaFormateada}`;

    const horaCita = document.createElement('p');
    horaCita.innerHTML = `<span>Hora: </span> ${hora} Horas`;

    //Boton paracrear una cita

    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar cita';
    botonReservar.onclick = reservarCita;

    
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    resumen.appendChild(botonReservar);

}

async function reservarCita(){

    const {nombre, fecha, hora, servicios,  id} = cita;

    const idServicios = servicios.map(servicio => servicio.id);
    

    const datos = new FormData();

    
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('Usuarios_id', id);
    datos.append('servicios', idServicios);

    //console.log([...datos]);
    try {
        //Petición hacia la API
        const url = '/api/citas';
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json();
        //console.log(resultado.resultado);

        if(resultado.resultado){
            Swal.fire({
                icon: "success",
                title: "Cita creada",
                text: "Tú cita fue creada correctamente",
                button: 'OK'
            }).then( () => {
                setTimeout( () =>{
                    window.location.reload();
                }, 3000); 

            })
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al guardar la cita",
          });
    }
}
    


