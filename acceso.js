const USUARIO_VAL = "alumno";
const PASS_VAL = "sanluis";

function togglePassword() {
    const $input = $("#contrasena");
    const $btn = $(".toggle-password");

    if ($input.attr("type") === "password") {
        $input.attr("type", "text");
        $btn.text("🙈");
    } else {
        $input.attr("type", "password");
        $btn.text("👁️");
    }
}

function consultarEntradas() {
    const user = $("#usuario").val();
    const pass = $("#contrasena").val();

    if (!user || !pass) {
        alert("Es obligatorio rellenar ambos campos: usuario y contraseña.");
        return;
    }

    if (user === USUARIO_VAL && pass === PASS_VAL) {
        alert("¡Todo es correcto! Cargando 'tratarDatos.php'...");
    
        window.location.href = "tratarDatos.php"; 
        
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

$(document).ready(function() {
    $("#formAcceso").on("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            consultarEntradas();
        }
    });
});