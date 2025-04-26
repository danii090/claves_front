const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email: username, // Asegúrate de que coincidan los campos con tu backend
            password: password,
        }, {
            withCredentials: true // 👈 Esto permite enviar cookies de sesión
        });

        if (response.status === 200) {
            alert('Inicio de sesión exitoso');
            console.log('Usuario logueado:', response.data.user);
            window.location.href = 'dashboard.html'; // 👈 Redirige al dashboard
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message || 'Error al iniciar sesión');
        } else {
            console.error(error.message);
            alert('No se pudo conectar al servidor.');
        }
    }
});

const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');


registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});


$(document).ready(function () {
    $('#form-registro').submit(async function (e) {
        e.preventDefault();
        const usuario = $('#usuario').val();
        const correo = $('#correo').val();
        const contrasena = $('#contrasena').val();

        const datos = {
            nombre: usuario,
            email: correo,
            clave: contrasena,
        }

        try {
            const respuesta = await axios.post('http://localhost:3000/api/auth/register', datos, {
                withCredentials: true
            });
            if (respuesta.status === 201) {
                Swal.fire({
                    title: "Registro exitoso!",
                    text: respuesta.data.message,
                    icon: "success",
                });
            }
        } catch (err) {
            console.log(datos, err);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message,
            });
        }
    })
});
