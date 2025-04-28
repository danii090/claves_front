$(document).ready(function () {
    const getMiembros = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/familias/miembros', {
                withCredentials: true
            });

            const miembros = respuesta.data;
            console.log(miembros);

            miembros.map(m => {
                $('#tbody').append(`
                  <tr>
                      <td>${m.nombre}</td>
                      <td>${m.email}</td>
                      <td>
                        <button class="btn btn-danger btn-expulsar" data-id-usuario="${m.id_usuario}">Expulsar</button>
                      </td>
                  </tr>
              `);
            });

            // Aquí llamamos a expulsarMiembro después de pintar los botones
            expulsarMiembro();

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response?.data?.message || "Error al cargar miembros",
            });
        }
    }

    const expulsarMiembro = () => {
        $('.btn-expulsar').click(async function () {
            const idUsuario = $(this).data('id-usuario');

            const confirmacion = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción expulsará al miembro.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, expulsar',
                cancelButtonText: 'Cancelar'
            });

            if (confirmacion.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/api/familias/expulsar/${idUsuario}`, {
                        withCredentials: true
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'Expulsado',
                        text: 'El miembro fue expulsado exitosamente.',
                    });

                    // Recargar la tabla después de expulsar
                    $('#tbody').empty();
                    getMiembros();

                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.response?.data?.message || "Error al expulsar al miembro",
                    });
                }
            }
        });
    }

    getMiembros();
});
