const REGEX_DNI = /^[0-9]{8}[A-Z]$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRECIOS = { infantil: 30, adulto: { zona1: 80, zona2: 60 } };

const validarDNI = (dni) => REGEX_DNI.test(dni);
const validarEmail = (email) => REGEX_EMAIL.test(email);

$(document).ready(function() {

    $("#formEntrada input, #formEntrada select").hover(
        function() { $(this).css("background-color", "pink"); },
        function() { $(this).css("background-color", ""); }
    );

    $("#aceptoCondiciones").on("change", function() {
        if ($(this).is(":checked")) {
            $("#btnComprar").prop("disabled", false).css("opacity", "1");
        } else {
            $("#btnComprar").prop("disabled", true).css("opacity", "0.5");
        }
    });
});

function calcularPrecio() {
    const tipo = $("#tipoEntrada").val();
    const zona = $("#zona").val();
    const edad = parseInt($("#edad").val());

    if (!tipo || !zona) { alert("Selecciona tipo y zona"); return; }
    
    let precio = 0;
    if (tipo === "infantil") {
        if (edad >= 18) { alert("Infantil debe ser < 18 años"); return; }
        precio = PRECIOS.infantil;
    } else {
        if (edad < 18) { alert("Adulto debe ser >= 18 años"); return; }
        precio = (zona === "zona1") ? PRECIOS.adulto.zona1 : PRECIOS.adulto.zona2;
    }

    $("#precio").val(precio.toFixed(2) + " €");
}

function comprarEntrada() {
    const dni = $("#dni").val();
    const email = $("#email").val();
    const precio = $("#precio").val();

    if (!dni || !email || !precio || precio === "0.00 €") {
        alert("Faltan datos o calcular el precio.");
        return;
    }
    if (!validarDNI(dni)) { alert("DNI incorrecto"); return; }
    if (!validarEmail(email)) { alert("Email incorrecto"); return; }

    alert("Todos los datos son correctos. Enviando...");
}