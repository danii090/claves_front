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
            window.location.href = '/dashboard.html'; // 👈 Redirige al dashboard
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