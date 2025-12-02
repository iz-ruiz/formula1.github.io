$(document).ready(function() {
    $("#logo").hover(
        function() {
            $(this).css('transform', 'scale(1.15)');
        }, 
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    $(".menu-item").hover(
        function() {
            $(this).find(".submenu").stop(true, true).slideDown(300);
        }, 
        function() {
            $(this).find(".submenu").stop(true, true).slideUp(300);
        }
    );

    if ($(".carousel").length > 0) {
        
        const $imagenes = $(".carousel-imagen");
        const $titulo = $("#carousel-titulo");

        const titulos = [
            "La emoción de la F1", "Circuito urbano de Bilbao", 
            "Velocidad máxima en las rectas", "El Guggenheim como telón de fondo", 
            "Curvas técnicas del circuito", "La ría de Bilbao iluminada", 
            "Boxes y equipo técnico", "Podio de ganadores", 
            "Afición vibrante en las gradas", "Bilbao, ciudad anfitriona"
        ];

        let currentIndex = 0;

        function cambiarImagen() {
            $($imagenes[currentIndex]).removeClass('active');

            currentIndex = (currentIndex + 1) % $imagenes.length;

            $($imagenes[currentIndex]).addClass('active');

            $titulo.text(titulos[currentIndex]);
        }

        setInterval(cambiarImagen, 3000);
    }

});