const form = document.getElementById('login-form');

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita que el formulario recargue la página

            // Captura los datos ingresados
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                // Enviar datos a la API de login
                const response = await axios.post('http://localhost:3000/api/auth/login', { // Ajusta la URL según la configuración del backend
                    email: username, // Asegúrate de usar el mismo campo esperado en el backend
                    clave: password
                });

                // Manejo de la respuesta
                if (response.status === 200) {
                    alert('Inicio de sesión exitoso');
                    console.log('Usuario logueado:', response.data.user);
                }
            } catch (error) {
                if (error.response) {
                    // Error de la API (por ejemplo, credenciales incorrectas)
                    alert(error.response.data.message || 'Error al iniciar sesión');
                } else {
                    // Otro error (como conexión fallida)
                    console.error(error.message);
                    alert('No se pudo conectar al servidor.');
                }
            }
        });