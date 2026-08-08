// =====================================
// CONFIGURACIÓN
// =====================================

const CONFIG = {

    inicio: "03/08/2026",

    personas: [
        "MATI",
        "NAHUEL",
        "MAU",
        "CLARA",
        "TAM",
        "CAMI J.",
        "EZE",
        "CAMI P."
    ],

    feriados: [
        "17/08/2026",
        "12/10/2026",
        "23/11/2026",
        "08/12/2026",
        "25/12/2026"
    ]

};


// COLORES PERSONAS

const colores = {

    "MATI":"azul",
    "NAHUEL":"gris",
    "MAU":"verde",
    "EZE":"turquesa",
    "CLARA":"naranja",
    "TAM":"lavanda",
    "CAMI J.":"amarillo",
    "CAMI P.":"coral"

};

// PREFERENCIAS DE FACTURAS

const preferencias = {

    "MATI": [
        "Medialunas",
        "Crema pastelera"
    ],

    "NAHUEL": [
        "Cualquiera con pastelera (si es de las que son de pastelera con otra cosa más: con membrillo o dulce de leche son bienvenidas; las que tienen coco rallado, maní picado, guinda u otra fruta son un crimen contra la pastelera).",
        "Negritas."
    ],

    "MAU": [
        "Medialuna (si hay alguna de grasa, mejor).",
        "Ve lo que haya (también es team pastelera)."
    ],

    "CLARA": [
        "Alguna de dulce de leche que sea fácil de comer mientras trabaja en el escritorio."
    ],

    "TAM": [
        "Churrinches o sino lengüitas/vigilantes con pastelera.",
        "Cualquiera con DDL."
    ],

    "CAMI J.": [
        "Churros (SOLO si tienen dulce de leche)"
    ],

    "EZE": [
        "Tortitas negras.",
        "Bolas de fraile."
    ],

    "CAMI P.": [
        "Pastelera.",
        "Alguna con dulce de leche."
    ]

};

// frases

const frases = [
    '🥐 "Una buena reunión empieza con medialunas."',
    '🧈 "Ante la duda, pastelera."',
    '☕ "No me hables si todavía no comí mi factura del día."',
    '🥐 "Mi productividad empieza después de la primera medialuna."',
    '☕ "No tomo decisiones importantes antes del café. Ni después, probablemente."',
    '🥐 "Hay situaciones que no se solucionan con medialunas. Pero podemos intentarlo."',
    '🥐 "Compartir es importante. Salvo si se trata de la última medialuna."',
    '☕ "Al que madruga, una medialuna lo ayuda."',
    '🥐 "Dime qué factura eliges y te diré quién eres."',
    '🥐 "El tiempo vuela, las medialunas también."',
    '🥐 "Al pan, pan; y a la factura, pastelera."' ,
    '🥐 "Más vale factura conocida que panadería por conocer."',
    '🥐 "Ojos que no ven, factura que desaparece."',
    '🥐 "El hábito no hace al monje, pero la medialuna hace al empleado."',

];
    const inicioFrases = new Date(2026, 7, 3); 

const hoyFrase = new Date();
hoyFrase.setHours(0, 0, 0, 0);

const diferenciaDias = Math.floor(
    (hoyFrase - inicioFrases) / (1000 * 60 * 60 * 24)
);

const semanaActual = Math.floor(diferenciaDias / 7);

const fraseActual = frases[
    ((semanaActual % frases.length) + frases.length) % frases.length
];

const fraseSemana = document.getElementById("fraseSemana");

fraseSemana.textContent = fraseActual;


// REFERENCIAS HTML

const listaPersonas=document.getElementById("listaPersonas");

const nombreActual=document.getElementById("nombreActual");

const fechaActual=document.getElementById("fechaActual");

const contador=document.getElementById("contador");

const hero=document.querySelector(".hero");

// UTILIDADES

function convertirFecha(texto){

    const partes=texto.split("/");

    return new Date(

        Number(partes[2]),
        Number(partes[1])-1,
        Number(partes[0])

    );

}

function fechaTexto(fecha){

    const dia=String(fecha.getDate()).padStart(2,"0");

    const mes=String(fecha.getMonth()+1).padStart(2,"0");

    const anio=fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;

}

function esFeriado(fecha){

    return CONFIG.feriados.includes(

        fechaTexto(fecha)

    );

}

function esFinSemana(fecha){

    return fecha.getDay()==0 || fecha.getDay()==6;

}

function siguienteDiaHabil(fecha){

    const nueva=new Date(fecha);

    while(esFeriado(nueva) || esFinSemana(nueva)){

        nueva.setDate(

            nueva.getDate()+1

        );

    }

    return nueva;

}

function formatearFecha(fecha){

    const dias=[

        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"

    ];

    const meses=[

        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"

    ];

    return `${dias[fecha.getDay()]} ${fecha.getDate()} de ${meses[fecha.getMonth()]}`;

}


// GENERAR TURNOS

const turnos=[];

const agenda={};

CONFIG.personas.forEach(persona=>{

    agenda[persona]=[];

});

let fecha=convertirFecha(CONFIG.inicio);

const anio=fecha.getFullYear();

let indice=0;

while(fecha.getFullYear()==anio){

    let turno=new Date(fecha);

    turno=siguienteDiaHabil(turno);

    turnos.push({

        persona:CONFIG.personas[indice],

        fecha:turno

    });

    agenda[CONFIG.personas[indice]].push(

        new Date(turno)

    );

    indice++;

    if(indice>=CONFIG.personas.length){

        indice=0;

    }

    fecha.setDate(

        fecha.getDate()+7

    );

}



// BUSCAR PRÓXIMO TURNO

const hoy=new Date();

hoy.setHours(0,0,0,0);

let proximo=null;

for(const turno of turnos){

    if(turno.fecha>=hoy){

        proximo=turno;

        break;

    }

}

if(proximo){

    nombreActual.textContent = proximo.persona;

    fechaActual.innerHTML=formatearFecha(

        proximo.fecha

    );

    const dias=Math.floor(

        (proximo.fecha-hoy)/(1000*60*60*24)

    );

    if(dias===0){

        contador.innerHTML="🎉 ¡HOY TRAE FACTURAS!";

        hero.classList.add("hoy");

    }

    else if(dias===1){

        contador.innerHTML="⏳ Mañana hay facturas";

    }

    else{

        contador.innerHTML=`⏳ Faltan ${dias} días`;

    }

}

// ORDENAR PERSONAS SEGÚN SU PRÓXIMO TURNO

const personasOrdenadas = [...CONFIG.personas].sort((a, b) => {

    const proximoA = turnos.find(turno =>
        turno.persona === a &&
        turno.fecha >= hoy
    );

    const proximoB = turnos.find(turno =>
        turno.persona === b &&
        turno.fecha >= hoy
    );

    if (!proximoA) return 1;

    if (!proximoB) return -1;

    return proximoA.fecha - proximoB.fecha;

});

// CREAR TARJETAS


personasOrdenadas.forEach(persona=>{

    const card=document.createElement("div");

    card.className="persona";

    const fechas=agenda[persona];

    const gustos=preferencias[persona] || [];

    let html=`

        <div class="cabecera">

            <div class="info">

                <div class="icono ${colores[persona]}">
                    🥐
                </div>

                <div class="nombre">
                    ${persona}
                </div>

            </div>

            <div class="toggle">
                ↓ 
            </div>

        </div>

        <div class="contenido">

            <ul class="listaFechas">

    `;

    fechas.forEach(fecha=>{

        const esProximo=
            proximo &&
            proximo.persona===persona &&
            fecha.getTime()===proximo.fecha.getTime();

        html+=`

            <li>

                ${esProximo ? "⭐ " : "📅 "}
                ${formatearFecha(fecha)}

            </li>

        `;

    });

    // =====================================
// PREFERENCIAS DE ESTA PERSONA
// =====================================

if(gustos.length > 0){

    html+=`

        <div class="preferencias">

            <div class="preferencias-titulo">
                💛 PREFERENCIAS
            </div>

            <ol class="listaPreferencias">
    `;

    gustos.forEach(gusto=>{

        html+=`

            <li>
                ${gusto}
            </li>

        `;

    });

    html+=`

            </ol>

        </div>

    `;

}

    html+=`

            </ul>

        </div>

    `;

    card.innerHTML=html;

    listaPersonas.appendChild(card);

});


// ACORDEONES

document.querySelectorAll(".cabecera").forEach(cabecera=>{

    cabecera.addEventListener("click",()=>{

        const tarjeta=cabecera.parentElement;

        const toggle=tarjeta.querySelector(".toggle");

        const abierta=tarjeta.classList.contains("abierta");

        // Cerrar las demás
        document.querySelectorAll(".persona").forEach(p=>{

            p.classList.remove("abierta");

            p.querySelector(".toggle").textContent="↓";

        });

        if(!abierta){

            tarjeta.classList.add("abierta");

            toggle.textContent="⌃";

        }

    });

});

//mouse efecto

document.querySelectorAll(".persona").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-3px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});


// mensaje fin de año

if(!proximo){

    nombreActual.innerHTML="🎄";

    fechaActual.innerHTML="No quedan más turnos este año";

    contador.innerHTML="¡Felices fiestas!";

}
