let listaTurnos = [];

let formulario = document.getElementById("formularioTurnos");
let nombrePaciente = document.getElementById("nombrePaciente");
let razaPaciente = document.getElementById("razaPaciente");
let edadPaciente = document.getElementById("edadPaciente");
let pesoPaciente = document.getElementById("pesoPaciente");
let tipoServicio = document.getElementById("tipoServicio");
let horarioTurno = document.getElementById("horarioTurno");
let agendaTurnos = document.getElementById("agendaTurnos");


function agendarTurno(){
    let nombre = nombrePaciente.value;
    let raza = razaPaciente.value;
    let edad = edadPaciente.value;
    let peso = pesoPaciente.value;
    let servicio = tipoServicio.value;
    let hora = horarioTurno.value;

    if (nombre && raza && peso && servicio && hora){
        let nuevoTurno = {
            nombre: nombre, 
            raza: raza,
            edad: edad,
            peso: peso, 
            servicio: servicio,
            fecha: hora.split("T")[0],
            hora: hora.split("T")[1],
            estado: "Por confirmar"
        };
        
        listaTurnos.push(nuevoTurno);
        formulario.reset();

        mostrarTurnos();
        guardarTurnos();

        Swal.fire("Turno Agendado", "El turno se ha agendado correctamente.")
    } else { 
        Swal.fire("Error", "Por favor, complete todos los campos del formulario.")
    }
}

function mostrarTurnos() { 
    agendaTurnos.innerHTML = " ";
    
    listaTurnos.map(turno => {
        let fila = agendaTurnos.insertRow();

        let fechaHora = new Date(turno.fecha + " " + turno.hora);
        let formatoFechaHora = fechaHora.toLocaleString();

        fila.insertCell(0).textContent = turno.nombre;
        fila.insertCell(1).textContent = turno.raza;
        fila.insertCell(2).textContent = turno.edad + " años";
        fila.insertCell(3).textContent = turno.peso + " kg";
        fila.insertCell(4).textContent = turno.servicio;
        fila.insertCell(5).textContent = turno.fecha + " " + turno.hora;
        fila.insertCell(6).textContent = turno.estado;
    })
    
}

formulario.addEventListener("submit", event => {
    event.preventDefault();
    agendarTurno();
});

mostrarTurnos();

function guardarTurnos(){
    localStorage.setItem('listaTurnos', JSON.stringify(listaTurnos)); 
}

function cargarTurnos(){
    const turnosGuardados = localStorage.getItem('listaTurnos');
    if (turnosGuardados) {
        listaTurnos = JSON.parse(turnosGuardados)
        mostrarTurnos();
    }
}

window.addEventListener('load', cargarTurnos);

async function obtenerClima() {
    const url = 'https://open-weather13.p.rapidapi.com/city/Buenos%20Aires';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '528c40d791msh929e5ba8ee0d23ap126b9djsned2e5d7d26ee',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const iconCode = result.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        const contenedorClima = document.getElementById('contenedor-clima');
        contenedorClima.innerHTML = `
            <p>Temperatura: ${result.main.temp}°C</p>
            <p>Descripción: ${result.weather[0].description}</p>
            <p>Humedad: ${result.main.humidity}%</p>
            <img src="${iconUrl}" alt="Icono del clima">
        `;
    } catch (error) {
        console.error(error);
    }
}

obtenerClima();
