
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');


registerBtn.addEventListener('click', () =>{
    container.classList.add('active');
});

loginBtn.addEventListener('click', () =>{
    container.classList.remove('active');
});

//Validación de para ir a dashboard
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita la recarga de la página

        // Obtener los valores ingresados
        const user = loginForm.querySelector("input[type='text']").value;
        const pass = loginForm.querySelector("input[type='password']").value;

        // 🔹 Simulamos un usuario válido
        const usuariosValidos = [
            { usuario: "admin", contraseña: "1234" },
            { usuario: "usuario1", contraseña: "abcd" }
        ];

        // 🔹 Verificamos si el usuario y la contraseña son correctos
        const usuarioValido = usuariosValidos.find(u => u.usuario === user && u.contraseña === pass);

        if (usuarioValido) {
            alert("Login exitoso!");
            localStorage.setItem("usuario", user); // Guardar sesión en el navegador
            window.location.href = "dashboard.html"; // Redirigir al dashboard
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
});

