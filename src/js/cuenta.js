//Barra lateral
const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

//VERIFICAR SESION
// Verifica la sesión cuando se carga el dashboard
axios.get('http://localhost:3000/api/auth/session', {
  withCredentials: true
})
  .then(response => {
    console.log('Sesión activa', response.data.session);

  })
  .catch(error => {
    alert('No tienes una sesión activa. Porfavor inicia sesión o registrate.');

    // Redirigir después de 2 segundos (2000 milisegundos)
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });

  //Usuarios en la tabla
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/usuarios', { withCredentials: true });
  
      console.log("Datos recibidos:", response.data);
  
      const cuerpoTabla = document.querySelector('.table tbody');
      cuerpoTabla.innerHTML = '';
  
      const claves = Array.isArray(response.data) ? response.data : [response.data];
  
      claves.forEach((usuarios, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${usuarios.nombre}</td>
          <td>${usuarios.email}</td>
          <td>${usuarios.clave}</td>
          <td>${usuarios.id_rol}</td>
          <td>${usuarios.id_familia}</td>
          <th>
            <button type="button" class="btn btn-outline-primary" onclick='abrirModalEditar(${JSON.stringify(usuarios)})'>Editar</button>
          </th>
        `;
        cuerpoTabla.appendChild(fila);
      });
  
    } catch (error) {
      console.error("Error completo:", error);
      alert("Error al cargar datos. Ver consola para detalles.");
    }
  });
  

//Bienvenida
// Función para obtener datos del usuario 
async function obtenerUsuario() {
  try {
      const respuesta = await axios.get('http://localhost:3000/api/usuarios/1', { withCredentials: true }); // Solicitud GET con Axios
      const datos = respuesta.data; // Acceso a los datos devueltos por la API

      // Inserta el nombre del usuario en el HTML
      const nombreUsuario = datos.nombre || "Usuario"; // Si no hay nombre, usa "Usuario" como valor predeterminado
      document.getElementById("bienvenida").textContent = `Gestión de Usuarios - Administrador: ${nombreUsuario}`;
  } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      document.getElementById("bienvenida").textContent = "Gestión de Usuarios - Administrador: invitado";
  }
}

// Llama a la función cuando se carga la página
obtenerUsuario();

//Busqueda
const inputBuscador = document.getElementById('buscador');
const cuerpoTabla = document.querySelector('.table tbody'); 


inputBuscador.addEventListener('input', () => {
  const filtro = inputBuscador.value.toLowerCase();
  const filas = cuerpoTabla.getElementsByTagName('tr');

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const textoFila = fila.textContent.toLowerCase();
    
    if (textoFila.includes(filtro)) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
});
///Modal
function abrirModalEditar(usuario) {
  document.getElementById('editar-id-usuario').value = usuario.id_usuario;
  document.getElementById('editar-nombre-usuario').value = usuario.nombre;
  document.getElementById('editar-email-usuario').value = usuario.email;
  document.getElementById('editar-clave-usuario').value = usuario.clave;
  document.getElementById('editar-rol-usuario').value = usuario.id_rol;
  document.getElementById('editar-familia-usuario').value = usuario.id_familia;

  const modal = new bootstrap.Modal(document.getElementById('modalEditarUsuarios'));
  modal.show();
}
//Editar Usuario
document.getElementById('formEditarUsuarios').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('editar-id-usuario').value;
  const data = {
    nombre: document.getElementById('editar-nombre-usuario').value,
    email: document.getElementById('editar-email-usuario').value,
    clave: document.getElementById('editar-clave-usuario').value,
    id_rol: parseInt(document.getElementById('editar-rol-usuario').value),
    id_familia: parseInt(document.getElementById('editar-familia-usuario').value),

  };

  try {
    await axios.put(`http://localhost:3000/api/usuarios/${id}`, data, { withCredentials: true });
    alert('Usuario actualizado correctamente');
    location.reload(); // Recarga la tabla
  } catch (error) {
    console.error('Error al editar el usuario:', error);
    alert('Error al guardar los cambios');
  }
});

// Eliminar usuario
document.getElementById('btnEliminarUsuario').addEventListener('click', async function() {
  const id = document.getElementById('editar-id-usuario').value;
  
  if (!id) {
    alert('No se ha seleccionado ninguna usuario para eliminar');
    return;
  }

  if (confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/usuarios/${id}`, { 
        withCredentials: true 
      });
      
      alert('Usuario eliminado correctamente');
      
      // Cierra el modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarUsuarios'));
      modal.hide();
      
      // Recarga la tabla
      location.reload();
      
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      if (error.response && error.response.status === 404) {
        alert('No se encontró el usuario o no tienes permiso para eliminarla');
      } else {
        alert('Error al eliminar el usuario');
      }
    }
  }
});

// Función para abrir el modal de creación
document.getElementById('fab').addEventListener('click', function() {
 
  // Resetear el formulario
  document.getElementById('formCrearUsuario').reset();
  
  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('modalCrearUsuario'));
  modal.show();
});

// Manejar el envío del formulario de creación
document.getElementById('formCrearUsuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
      nombre: document.getElementById('crear-nombre-usuario').value,
      email: document.getElementById('crear-email-usuario').value,
      clave: document.getElementById('crear-clave-usuario').value,
      id_rol: parseInt(document.getElementById('crear-rol-usuario').value),
      id_familia: parseInt(document.getElementById('crear-familia-usuario').value),
  };

  try {
      const response = await axios.post('http://localhost:3000/api/usuarios', data, { 
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json'
          }
      });
      
      alert('Usuario creado correctamente');
      
      // Cerrar el modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalCrearUsuario'));
      modal.hide();
      
      // Recargar la tabla
      location.reload();
      
  } catch (error) {
      console.error('Error al crear el usuario:', error);
      if (error.response && error.response.status === 400) {
          alert('Datos incompletos: ' + error.response.data.message);
      } else {
          alert('Error al crear el usuario');
      }
  }
});
