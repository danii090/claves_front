document.addEventListener("DOMContentLoaded", function() {
    // Configurar el logout
    setupLogout(); // Usa el ID por defecto 'logout'
});

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
//Bienvenida
// Función para obtener datos del usuario 
async function obtenerUsuario() {
  try {
    const respuesta = await axios.get('http://localhost:3000/api/auth/session', { withCredentials: true }); // Solicitud GET con Axios
    const datos = respuesta.data; // Acceso a los datos devueltos por la API

      // Inserta el nombre del usuario en el HTML
      const nombreUsuario = datos.session.nombre || "Usuario"; // Si no hay nombre, usa "Usuario" como valor predeterminado
      document.getElementById("bienvenida").textContent = Cuenta de: ${nombreUsuario};
  } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      document.getElementById("bienvenida").textContent = "Cuenta de Invitado";
  }
}

// Llama a la función cuando se carga la página
obtenerUsuario();


async function obtenerUsuario() {
  try {
      const respuesta = await axios.get('http://localhost:3000/api/auth/session', { 
          withCredentials: true 
      });
      
      const nombreUsuario = respuesta.data?.session?.nombre || "Invitado";
      const elementoBienvenida = document.getElementById("bienvenida");
      
      // Respetar el texto original y solo agregar el nombre
      const textoOriginal = elementoBienvenida.textContent.trim();
      const textoBase = textoOriginal.replace(/: $/, "") || "Cuenta de"; // Elimina ": " si existe
      
      elementoBienvenida.textContent = ${textoBase} ${nombreUsuario};
      
  } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      const elementoBienvenida = document.getElementById("bienvenida");
      const textoOriginal = elementoBienvenida.textContent.trim();
      const textoBase = textoOriginal.replace(/: $/, "") || "Cuenta de";
      
      elementoBienvenida.textContent = ${textoBase}: Invitado;
  }
}

async function logout() {
  try {
      const response = await axios.post('http://localhost:3000/api/auth/logout', {}, {
          withCredentials: true
      });
      
      if (response.status === 200) {
          // Limpiar almacenamiento local
          localStorage.clear();
          sessionStorage.clear();
          
          // Redirigir al login
          window.location.href = 'index.html';
      }
  } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error; // Permite manejar el error en el componente que llama la función
  }
}

function setupLogout(elementId = 'logout') {
  const logoutElement = document.getElementById(elementId);
  if (logoutElement) {
      logoutElement.addEventListener('click', async (e) => {
          e.preventDefault();
          try {
              await logout();
          } catch (error) {
              alert('Ocurrió un error al cerrar sesión. Por favor intente nuevamente.');
          }
      });
  }
}









document.addEventListener("DOMContentLoaded", function() {
  // Variables globales
  let usuarioTieneFamilia = false;
  let usuarioActual = null;

  // Inicializar la página
  init();

  async function init() {
      await verificarSesion();
      await verificarFamiliaUsuario();
      setupEventListeners();
  }

  // Verificar sesión activa
  async function verificarSesion() {
      try {
          const response = await axios.get('http://localhost:3000/api/auth/session', {
              withCredentials: true
          });
          
          usuarioActual = response.data.session;
          actualizarUIUsuario();
      } catch (error) {
          console.error('Error al verificar sesión:', error);
          mostrarErrorSesion();
      }
  }

  // Actualizar UI con datos del usuario
  function actualizarUIUsuario() {
      try {
          if (usuarioActual) {
              const elementoBienvenida = document.getElementById("bienvenida");
              if (elementoBienvenida) {
                  elementoBienvenida.textContent = Cuenta de: ${usuarioActual.nombre || "Usuario"};
              }
          }
      } catch (error) {
          console.error('Error al actualizar UI:', error);
      }
  }

  // Mostrar error de sesión
  function mostrarErrorSesion() {
      Swal.fire({
          icon: 'error',
          title: 'Sesión no válida',
          text: 'Serás redirigido al login',
          timer: 2000,
          showConfirmButton: false
      }).then(() => {
          window.location.href = 'index.html';
      });
  }

  // Verificar si el usuario tiene familia
  async function verificarFamiliaUsuario() {
      try {
          if (!usuarioActual) return;
          
          usuarioTieneFamilia = usuarioActual.familia !== null;
          
          // Mostrar/ocultar secciones según si tiene familia
          const cardCrearFamilia = document.getElementById('card-crear-familia');
          const cardGestionInvitaciones = document.getElementById('card-gestion-invitaciones');
          const cardInfoFamilia = document.getElementById('card-info-familia');
          
          if (cardCrearFamilia && cardGestionInvitaciones && cardInfoFamilia) {
              if (usuarioTieneFamilia) {
                  cardCrearFamilia.classList.add('d-none');
                  cardGestionInvitaciones.classList.remove('d-none');
                  cardInfoFamilia.classList.remove('d-none');
                  cargarInfoFamilia(usuarioActual.familia);
                  cargarInvitaciones();
              } else {
                  cardCrearFamilia.classList.remove('d-none');
                  cardGestionInvitaciones.classList.add('d-none');
                  cardInfoFamilia.classList.add('d-none');
              }
          }
      } catch (error) {
          console.error('Error al verificar familia:', error);
      }
  }

  // Cargar información de la familia
  function cargarInfoFamilia(familia) {
      const infoFamilia = document.getElementById('info-familia');
      if (infoFamilia) {
          infoFamilia.innerHTML = `
              <p><strong>Nombre:</strong> ${familia.nombre}</p>
              <p><strong>ID Familia:</strong> ${familia.id}</p>
              <p><strong>Rol:</strong> Líder</p>
          `;
      }
  }

  // Configurar event listeners
  function setupEventListeners() {
      // Formulario para crear familia
      const formCrearFamilia = document.getElementById('formCrearFamilia');
      if (formCrearFamilia) {
          formCrearFamilia.addEventListener('submit', async function(e) {
              e.preventDefault();
              await crearFamilia();
          });
      }

      // Formulario para crear invitación
      const formCrearInvitacion = document.getElementById('formCrearInvitacion');
      if (formCrearInvitacion) {
          formCrearInvitacion.addEventListener('submit', async function(e) {
              e.preventDefault();
              await generarInvitacion();
          });
      }

      // Botón para copiar token
      const btnCopiarToken = document.getElementById('btn-copiar-token');
      if (btnCopiarToken) {
          btnCopiarToken.addEventListener('click', copiarToken);
      }
  }

  // Función para crear familia
  async function crearFamilia() {
      const nombreFamilia = document.getElementById('nombre-familia')?.value.trim();
      const btnSubmit = document.getElementById('btn-submit-familia');
      
      if (!nombreFamilia || !btnSubmit) return;
      
      try {
          // Mostrar spinner
          btnSubmit.disabled = true;
          btnSubmit.querySelector('.spinner-border').classList.remove('d-none');
          
          const response = await axios.post('http://localhost:3000/api/familias/', {
              nombre: nombreFamilia
          }, {
              withCredentials: true
          });
          
          if (response.status === 201) {
              // Actualizar la sesión
              await verificarSesion();
              
              Swal.fire({
                  icon: 'success',
                  title: 'Familia creada',
                  text: Ahora eres el líder de "${nombreFamilia}",
                  confirmButtonText: 'Entendido'
              }).then(() => {
                  // Cerrar modal
                  const modal = bootstrap.Modal.getInstance(document.getElementById('modalCrearFamilia'));
                  modal.hide();
              });
          }
      } catch (error) {
          console.error('Error al crear familia:', error);
          let errorMessage = 'Ocurrió un error al crear la familia';
          
          if (error.response) {
              if (error.response.status === 400) {
                  errorMessage = 'Ya perteneces a una familia';
              } else if (error.response.data?.message) {
                  errorMessage = error.response.data.message;
              }
          }
          
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: errorMessage,
              confirmButtonText: 'Entendido'
          });
      } finally {
          if (btnSubmit) {
              btnSubmit.disabled = false;
              btnSubmit.querySelector('.spinner-border').classList.add('d-none');
          }
      }
  }

  // Función para generar invitación
  async function generarInvitacion() {
      const fechaInput = document.getElementById('fecha-vencimiento');
      const btnSubmit = document.getElementById('btn-submit-invitacion');
      const tokenInput = document.getElementById('token-invitacion');
      
      if (!fechaInput || !btnSubmit || !tokenInput) return;
      
      try {
          // Mostrar spinner
          btnSubmit.disabled = true;
          btnSubmit.querySelector('.spinner-border').classList.remove('d-none');
          
          const response = await axios.post('http://localhost:3000/api/invitaciones/', {
              fecha_vencimiento: fechaInput.value
          }, {
              withCredentials: true
          });
          
          if (response.status === 201) {
              tokenInput.value = response.data.token;
              await cargarInvitaciones();
              
              Swal.fire({
                  icon: 'success',
                  title: 'Invitación generada',
                  text: 'El token ha sido copiado al portapapeles',
                  confirmButtonText: 'Entendido'
              });
              
              // Copiar automáticamente el token
              copiarToken();
          }
      } catch (error) {
          console.error('Error al generar invitación:', error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo generar la invitación',
              confirmButtonText: 'Entendido'
          });
      } finally {
          if (btnSubmit) {
              btnSubmit.disabled = false;
              btnSubmit.querySelector('.spinner-border').classList.add('d-none');
          }
      }
  }

  // Función para copiar token
  function copiarToken() {
      const tokenInput = document.getElementById('token-invitacion');
      const btnCopiar = document.getElementById('btn-copiar-token');
      
      if (!tokenInput || !btnCopiar) return;
      
      tokenInput.select();
      document.execCommand('copy');
      
      // Feedback visual
      const originalHTML = btnCopiar.innerHTML;
      btnCopiar.innerHTML = '<i class="lni lni-checkmark"></i> Copiado!';
      setTimeout(() => {
          btnCopiar.innerHTML = originalHTML;
      }, 2000);
  }

  // Función para cargar invitaciones
  async function cargarInvitaciones() {
      try {
          const response = await axios.get('http://localhost:3000/api/invitaciones/', {
              withCredentials: true
          });
          
          const listaInvitaciones = document.getElementById('lista-invitaciones');
          if (!listaInvitaciones) return;
          
          if (!response.data || response.data.length === 0) {
              listaInvitaciones.innerHTML = '<div class="text-muted">No hay invitaciones activas</div>';
              return;
          }
          
          let html = '';
          response.data.forEach(invitacion => {
              const fechaVencimiento = new Date(invitacion.fecha_vencimiento);
              const fechaFormateada = fechaVencimiento.toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
              });
              
              html += `
                  <div class="list-group-item">
                      <div class="d-flex justify-content-between align-items-center">
                          <div>
                              <strong>Token:</strong> ${invitacion.token}<br>
                              <small class="text-muted">Vence: ${fechaFormateada}</small>
                          </div>
                          <div>
                              <button class="btn btn-sm btn-outline-secondary me-2 btn-copiar" data-token="${invitacion.token}">
                                  <i class="lni lni-clipboard"></i> Copiar
                              </button>
                              <button class="btn btn-sm btn-outline-danger" data-id="${invitacion.id}">
                                  <i class="lni lni-trash"></i>
                              </button>
                          </div>
                      </div>
                  </div>
              `;
          });
          
          listaInvitaciones.innerHTML = html;
          
          // Eventos para los botones dinámicos
          document.querySelectorAll('.btn-copiar').forEach(btn => {
              btn.addEventListener('click', () => {
                  navigator.clipboard.writeText(btn.dataset.token);
                  btn.innerHTML = '<i class="lni lni-checkmark"></i> Copiado!';
                  setTimeout(() => {
                      btn.innerHTML = '<i class="lni lni-clipboard"></i> Copiar';
                  }, 2000);
              });
          });
          
          document.querySelectorAll('.btn-outline-danger').forEach(btn => {
              btn.addEventListener('click', async () => {
                  const confirmacion = await Swal.fire({
                      title: '¿Eliminar invitación?',
                      text: "Esta acción no se puede deshacer",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6',
                      confirmButtonText: 'Sí, eliminar',
                      cancelButtonText: 'Cancelar'
                  });
                  
                  if (confirmacion.isConfirmed) {
                      try {
                          await axios.delete(http://localhost:3000/api/invitaciones/${btn.dataset.id}, {
                              withCredentials: true
                          });
                          await cargarInvitaciones();
                          Swal.fire('Eliminada', 'La invitación ha sido eliminada', 'success');
                      } catch (error) {
                          Swal.fire('Error', 'No se pudo eliminar la invitación', 'error');
                      }
                  }
              });
          });
      } catch (error) {
          console.error('Error al cargar invitaciones:', error);
          const listaInvitaciones = document.getElementById('lista-invitaciones');
          if (listaInvitaciones) {
              listaInvitaciones.innerHTML = `
                  <div class="alert alert-danger">
                      Error al cargar las invitaciones. Intenta recargar la página.
                  </div>
              `;
          }
      }
  }
});