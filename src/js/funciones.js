export async function obtenerUsuario() {
    try {
        const respuesta = await axios.get('http://localhost:3000/api/auth/session', { withCredentials: true }); // Solicitud GET con Axios
        const datos = respuesta.data; // Acceso a los datos devueltos por la API

        // Inserta el nombre del usuario en el HTML
        const nombreUsuario = datos.session.nombre || "Usuario"; // Si no hay nombre, usa "Usuario" como valor predeterminado
        document.getElementById("bienvenida").textContent = `Gestión de Usuarios - Administrador: ${nombreUsuario}`;
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        document.getElementById("bienvenida").textContent = "Gestión de Usuarios - Administrador: invitado";
    }
}