// ============================================
// SORTEO.JS - Arrays y Generación de HTML
// ============================================

// Arrays de datos (PDF General pág. 16)
const pilotos = ["Max Verstappen", "Lewis Hamilton", "Charles Leclerc", "Sergio Pérez", "Carlos Sainz", "Lando Norris", "Fernando Alonso", "George Russell", "Oscar Piastri", "Pierre Gasly"];
const imagenes = ["imagenes/pilotos/max.png", "imagenes/pilotos/lhamilton.png", "imagenes/pilotos/cleclerc.png", "imagenes/pilotos/sergio-perez.png", "imagenes/pilotos/csainz.png", "imagenes/pilotos/lnorris.png", "imagenes/pilotos/falonso.png", "imagenes/pilotos/grussell.png", "imagenes/pilotos/opiastri.png", "imagenes/pilotos/pgasly.png"];
const PREMIOS = { 1: 5000, 2: 3000, 3: 1500 };

// Función auxiliar aleatoria (PDF General pág. 22)
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function comprobarSorteo() {
    // Recoger selección con JQuery
    const sel = [
        parseInt($("#piloto1").val()),
        parseInt($("#piloto2").val()),
        parseInt($("#piloto3").val())
    ];

    // Validaciones (isNaN explicado en PDF General pág. 11)
    if (sel.some(isNaN)) { alert("Selecciona 3 pilotos."); return; }
    // Set elimina duplicados automáticamente
    if (new Set(sel).size !== 3) { alert("No repitas pilotos."); return; }

    // Lógica del sorteo (Array push e includes - PDF General pág. 17)
    let ganadores = [];
    while (ganadores.length < 3) {
        let r = random(0, pilotos.length - 1);
        if (!ganadores.includes(r)) ganadores.push(r);
    }

    mostrarResultados(ganadores, sel);
}

function mostrarResultados(ganadores, seleccion) {
    let htmlCards = "";
    let aciertos = 0;
    let totalPremio = 0;
    let mensaje = "<h3>Resultados:</h3><ul>";

    // Recorrer resultados (Bucle For - PDF General pág. 16)
    for (let i = 0; i < 3; i++) {
        let puesto = i + 1;
        let idGanador = ganadores[i];
        let idUser = seleccion[i];
        let esAcierto = (idGanador === idUser);
        let clase = esAcierto ? "acertado" : "no-acertado";
        let emoji = ["🥇", "🥈", "🥉"][i];

        // Construir HTML de la tarjeta
        htmlCards += `
            <div class="ganador-card ${clase}">
                <div class="posicion-badge">${emoji}</div>
                <h3>${puesto}º Puesto</h3>
                <div class="ganador-imagen"><img src="${imagenes[idGanador]}"></div>
                <p><strong>${pilotos[idGanador]}</strong></p>
                <span class="estado-acierto ${clase}">${esAcierto ? "¡ACERTASTE!" : "Fallaste"}</span>
            </div>`;

        if (esAcierto) {
            aciertos++;
            totalPremio += PREMIOS[puesto];
            mensaje += `<li>✅ Acertaste el ${puesto}º (${pilotos[idGanador]}) - Ganas ${PREMIOS[puesto]}€</li>`;
        } else {
            mensaje += `<li>❌ ${puesto}º era ${pilotos[idGanador]} (Elegiste ${pilotos[idUser]})</li>`;
        }
    }

    mensaje += "</ul>";
    if (aciertos > 0) mensaje += `<div class="total-premio">TOTAL: ${totalPremio}€</div>`;
    else mensaje += "<p>No has tenido suerte esta vez.</p>";

    // CONCEPTO: Inyectar HTML con .html() y mostrar con .show() (PDF DOM pág. 35)
    $("#ganadoresGrid").html(htmlCards);
    $("#resultadoMensaje").html(mensaje);
    $("#resultadosSorteo").fadeIn(1000); // Efecto fadeIn
}