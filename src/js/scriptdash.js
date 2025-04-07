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


//PRUEBA DE LA TABLA
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/claves', { withCredentials: true });

    // Verifica la estructura real de los datos
    console.log("Datos recibidos:", response.data);

    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = '';

    // Asegúrate de que response.data sea un array
    const claves = Array.isArray(response.data) ? response.data : [response.data];

    claves.forEach((clave, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
              <th scope="row">${index + 1}</th>
              <td>${clave.sitio}</td>
              <td>${clave.nombre_clave}</td>
              <td>${clave.id_categoria}</td>
              <td>••••••••</td>
              <td>${clave.compartin === 1 ? '✅' : '❌'}</td>
          `;
      cuerpoTabla.appendChild(fila);
    });

  } catch (error) {
    console.error("Error completo:", error);
    alert("Error al cargar datos. Ver consola para detalles.");
  }
});