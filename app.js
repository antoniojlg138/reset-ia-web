document.addEventListener("DOMContentLoaded", () => {
    const formTest = document.getElementById("formTest");
    const seccionResultado = document.getElementById("resultado");
    const tituloResultado = document.getElementById("tituloResultado");
    const descripcionResultado = document.getElementById("descripcionResultado");
    const videoSource = document.getElementById("videoSource");
    const videoPausa = document.getElementById("videoPausa");
    const btnIrTest = document.getElementById("btnIrTest");
    const seccionTest = document.getElementById("seccionTest");
    const btnReiniciar = document.getElementById("btnReiniciar");

    // Botón del hero para bajar al test
    if (btnIrTest && seccionTest) {
        btnIrTest.addEventListener("click", () => {
            seccionTest.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Envío del formulario
    formTest.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita recargar la página

        // 0. Persona (Lía o Mike)
        const personaInput = document.querySelector('input[name="persona"]:checked');
        if (!personaInput) {
            alert("Por favor, seleccione si desea realizar el ejercicio con Lía o con Mike.");
            return;
        }
        const persona = personaInput.value; // "lia" o "mike"

        // 1. Obtener respuestas y sumar
        let total = 0;
        for (let i = 1; i <= 7; i++) {
            const seleccion = document.querySelector(`input[name="p${i}"]:checked`);
            if (!seleccion) {
                alert("Por favor, responda todas las preguntas.");
                return;
            }
            total += parseInt(seleccion.value, 10);
        }

        // 2. Determinar nivel de estrés
        let nivel;
        if (total <= 7) {
            nivel = "bajo";
        } else if (total <= 14) {
            nivel = "medio";
        } else {
            nivel = "alto";
        }

        // 3. Elegir video según nivel y persona
        const infoVideo = seleccionarVideo(persona, nivel);

        tituloResultado.textContent = infoVideo.titulo;
        descripcionResultado.textContent = infoVideo.descripcion;

        videoSource.src = `videos/${infoVideo.archivo}`;
        videoPausa.load();

        // Mostrar sección de resultado con animación
        seccionResultado.classList.add("visible");

        seccionResultado.scrollIntoView({ behavior: "smooth" });
    });

    // Botón "Terminé · Reiniciar evaluación"
    if (btnReiniciar) {
        btnReiniciar.addEventListener("click", () => {
            // Pausar y reiniciar video
            videoPausa.pause();
            videoPausa.currentTime = 0;
            videoSource.src = "";

            // Limpiar todas las respuestas
            formTest.reset();

            // Ocultar la sección de resultado
            seccionResultado.classList.remove("visible");

            // Volver a la parte superior (hero)
            const hero = document.querySelector(".hero");
            if (hero) {
                hero.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});

/**
 * Selecciona archivo, título y descripción
 * según la persona (lia/mike) y el nivel (bajo/medio/alto).
 */
function seleccionarVideo(persona, nivel) {
    const esLia = persona === "lia";

    if (nivel === "bajo") {
        return {
            archivo: esLia ? "lia_baja.mp4" : "mike_baja.mp4",
            titulo: "Recomendación RESET – Nivel bajo",
            descripcion: "Se sugiere un ejercicio RESET ligero para mantener enfoque, movilidad y bienestar."
        };
    } else if (nivel === "medio") {
        return {
            archivo: esLia ? "lia_media.mp4" : "mike_media.mp4",
            titulo: "Recomendación RESET – Nivel medio",
            descripcion: "Este ejercicio RESET ayuda a liberar tensión acumulada y recuperar estabilidad física y mental."
        };
    } else {
        return {
            archivo: esLia ? "lia_alta.mp4" : "mike_alta.mp4",
            titulo: "Recomendación RESET – Nivel alto",
            descripcion: "Tu nivel de estrés es elevado. Este ejercicio RESET guiado está enfocado en una recuperación profunda."
        };
    }
}
