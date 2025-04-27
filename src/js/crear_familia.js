$(document).ready(function () {
    const getSession = async () => {
        const respuesta = await axios.get('http://localhost:3000/api/auth/session/', {
            withCredentials: true
        });

        const familia = respuesta.data.session.familia;
        console.log(familia);

        if (familia !== null) {
            $('#card-crear-familia').hide();
            $('#card-crear-familia').before(`
                <div class="card mb-4" id="card-crear-familia">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="lni lni-plus"></i> Familia ${familia.nombre}
                        </h5>
                    </div>
                    <div class="card-body">
                        <p>Actualmente usted ya pertenece a una familia</p>
                    </div>
                </div>    
            `);
        }
    }

    getSession();


    $('#formCrearFamilia').on('submit', async function (e) {
        e.preventDefault();
        const nombre = $('#nombre-familia').val();
        const datos = { nombre };

        try {
            const respuesta = await axios.post('http://localhost:3000/api/familias/', datos, {
                withCredentials: true
            });
            if (respuesta.status === 201) {
                Swal.fire({
                    title: "Familia creada!",
                    text: respuesta.data.message,
                    icon: "success",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message,
            });
        }

    });

});