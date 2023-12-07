

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
    } else { 
        alert("Por favor, complete todos los campos del formulario.");
    }
}

function mostrarTurnos() { 
    agendaTurnos.innerHTML = " ";
    
    listaTurnos.forEach(turno => {
        let fila = agendaTurnos.insertRow();

        fila.insertCell(0).textContent = turno.nombre;
        fila.insertCell(1).textContent = turno.raza;
        fila.insertCell(2).textContent = turno.edad + " años";
        fila.insertCell(3).textContent = turno.peso + " kg";
        fila.insertCell(4).textContent = turno.servicio;
        fila.insertCell(5).textContent = turno.fecha + " " + turno.hora;
        fila.insertCell(6).textContent = turno.estado;
    })
    
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    agregarTurno();
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
