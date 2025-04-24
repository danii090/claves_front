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

  //Claves en la tabla
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/claves', { withCredentials: true });
  
      console.log("Datos recibidos:", response.data);
  
      const cuerpoTabla = document.querySelector('.table tbody');
      cuerpoTabla.innerHTML = '';
  
      const claves = Array.isArray(response.data) ? response.data : [response.data];
  
      claves.forEach((clave, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${clave.sitio}</td>
          <td>${clave.nombre_clave}</td>
          <td>${clave.categoria.nombre}</td>
          <td>••••••••</td>
          <th>
            <button type="button" class="btn" onclick="verClave(this, '${clave.clave}')">
              <i class="lni lni-eye"></i>
            </button>
          </th>
          <td>${clave.compartir === 1 ? '✅ Compartida' : '❌ No compartida'}</td>
          <td>${clave.id_usuario}</td>
          <th>
            <button type="button" class="btn btn-outline-primary" onclick='abrirModalEditar(${JSON.stringify(clave)})'>Editar</button>
          </th>
        `;
        cuerpoTabla.appendChild(fila);
      });
  
    } catch (error) {
      console.error("Error completo:", error);
      alert("Error al cargar datos. Ver consola para detalles.");
    }
  });
  
  // Función para mostrar la clave real temporalmente
  function verClave(boton, clave) {
    const td = boton.closest('tr').children[4]; // La celda con '••••••••'
    const original = td.textContent;
    td.textContent = clave;
  
    setTimeout(() => {
      td.textContent = original;
    }, 2000); // Oculta la clave después de 2 segundos
  }

//Bienvenida
// Función para obtener datos del usuario 
async function obtenerUsuario() {
  try {
      const respuesta = await axios.get('http://localhost:3000/api/usuarios/1', { withCredentials: true }); // Solicitud GET con Axios
      const datos = respuesta.data; // Acceso a los datos devueltos por la API

      // Inserta el nombre del usuario en el HTML
      const nombreUsuario = datos.nombre || "Usuario"; // Si no hay nombre, usa "Usuario" como valor predeterminado
      document.getElementById("bienvenida").textContent = `Bienvenido, ${nombreUsuario}`;
  } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      document.getElementById("bienvenida").textContent = "Bienvenido, invitado";
  }
}

// Llama a la función cuando se carga la página
obtenerUsuario();

//Busqueda
const inputBuscador = document.getElementById('buscador');
const cuerpoTabla = document.querySelector('.table tbody'); // Mueve esto arriba


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
function abrirModalEditar(clave) {
  document.getElementById('editar-id-clave').value = clave.id_clave;
  document.getElementById('editar-sitio').value = clave.sitio;
  document.getElementById('editar-nombre-clave').value = clave.nombre_clave;
  document.getElementById('editar-clave').value = clave.clave;
  document.getElementById('editar-compartir').value = clave.compartir;

  // Llenar el select de categorías (solo si no lo has llenado antes)
  cargarCategoriasEnSelect('editar-categoria', clave.categoria.id);

  const modal = new bootstrap.Modal(document.getElementById('modalEditarClave'));
  modal.show();
}
async function cargarCategoriasEnSelect(idSelect, idCategoriaSeleccionada = null) {
  try {
    const response = await axios.get('http://localhost:3000/api/categorias', { withCredentials: true });
    const categorias = response.data;

    const select = document.getElementById(idSelect);
    select.innerHTML = ''; // Limpiar antes de volver a llenar

    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.id_categoria;
      option.textContent = categoria.nombre_categoria;

      if (idCategoriaSeleccionada && categoria.id_categoria === idCategoriaSeleccionada) {
        option.selected = true;
      }

      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando categorías', error);
  }
}
document.getElementById('formEditarClave').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('editar-id-clave').value;
  const data = {
    sitio: document.getElementById('editar-sitio').value,
    nombre: document.getElementById('editar-nombre-clave').value,
    clave: document.getElementById('editar-clave').value,
    compartir: parseInt(document.getElementById('editar-compartir').value),
    categoria: parseInt(document.getElementById('editar-categoria').value),
  };

  try {
    await axios.put(`http://localhost:3000/api/claves/${id}`, data, { withCredentials: true });
    alert('Clave actualizada correctamente');
    location.reload(); // Recarga la tabla
  } catch (error) {
    console.error('Error al editar clave:', error);
    alert('Error al guardar los cambios');
  }
});
