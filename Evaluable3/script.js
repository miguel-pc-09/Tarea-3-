// Función global para mostrar/ocultar contraseñas
//-------------------------------------------------
function mostrarOcultar(idCampo, boton){
    const input = document.getElementById(idCampo);
    if (input.type === "password") {
        input.type = "text";
        boton.textContent = "Ocultar contraseña";
    } else {
        input.type = "password";
        boton.textContent = 'Mostrar contraseña';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Estado del teclado virtual
    //------------------------------
    let mayusculas = true;
    campoActivo = null; // Campo de contraseña o confirmar que esté activo

    // -----------------------
    // VALIDACIÓN DE REGISTRO |
    // -----------------------
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que se envíe el formulario

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmar = document.getElementById("confirmar").value;

        // Validar campos vacíos
        //-------------------------
        if (!nombre || !correo || !contrasena || !confirmar) {
            alert("⚠️ Por favor, completa todos los campos.");
            return;
        }

        // Validar correo con expresión regular
        //--------------------------------------
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            alert("⚠️ Por favor, introduce un correo electrónico válido.");
            return;
        }

        // Validar que contraseñas coinciden
        //-----------------------------------
        if (contrasena !== confirmar) {
            alert("❌ Las contraseñas no coinciden.");
            return;
        }

        // Si todo está bien
        //---------------------
        alert(`✅ ¡Registro exitoso! Bienvenido, ${nombre}.`);
    });

    // ------------------------------------------------------------------
    // BOTONES MOSTRAR/OCULTAR SIEMPRE VISIBLES Y DETECTAR INPUT ACTIVO  |
    // ------------------------------------------------------------------
    const contrasena = document.getElementById("contrasena");
    const confirmar = document.getElementById("confirmar");
    const btnContrasena = document.getElementById("btonContrasena");
    const btnConfirmar = document.getElementById("btonConfirmar");

    contrasena.addEventListener("focus", () => {
        campoActivo = contrasena;
    });

    confirmar.addEventListener("focus", () => {
        campoActivo = confirmar;
    });

    // -----------------
    // TECLADO VIRTUAL |
    // -----------------
    const teclas = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM@.-←";
    const teclado = document.getElementById("teclado");

    // Botón Mayús
    //---------------
    const teclaMayus = document.createElement("button");
    teclaMayus.textContent = "Mayús";
    teclaMayus.classList.add("tecla");
    teclaMayus.addEventListener("click", (e) => {
        e.preventDefault();
        mayusculas = !mayusculas;
        actualizarTeclado();
    });
    teclado.appendChild(teclaMayus);

    // Función que genera el teclado (regenera según mayúsculas)
    //------------------------------------------------------------
    function actualizarTeclado() {
        // Elimina todas las teclas excepto el botón Mayús
        teclado.querySelectorAll(".tecla").forEach(btn => {
            if (btn.textContent !== "Mayús") {
                btn.remove();
            }
        });

        // Generar teclas
        //----------------
        for (let tecla of teclas) {
            let mostrar = tecla;
            if (/[A-Z]/.test(tecla)) {
                mostrar = mayusculas ? tecla : tecla.toLowerCase();
            }

            const btn = document.createElement("button");
            btn.classList.add("tecla");
            btn.textContent = mostrar;

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (campoActivo) {
                    if (tecla === "←") {
                        campoActivo.value = campoActivo.value.slice(0, -1);
                    } else {
                        campoActivo.value += mostrar;
                    }
                }
            });

            teclado.appendChild(btn);
        }
    }

    // Generar por primera vez el teclado
    //---------------------------------------
    actualizarTeclado();
});
