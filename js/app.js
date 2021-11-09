let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});
const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=06c1cb5459d496cda1a72f6b32bd372c&lenguage=es-ES&page=${pagina}`
    );

    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = "";

      datos.results.forEach((pelicula) => {
        peliculas += `
        <div class="col-4">
            <div class="card">
              <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="img-fluid"/>
                <a href="#!">
                  <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                </a>
              </div>
              <div class="card-body">
                <h5 class="card-title">${pelicula.title}</h5>
                <p class="card-text">
                <p>${pelicula.overview}</p>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span>(${pelicula.vote_average})</span>
                </p>
              </div>
            </div>
        </div>
                `;
      });

      document.getElementById("card").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.log("wrong!, bad key");
    } else if (respuesta.status === 404) {
      console.log("Pelicula no encontrada");
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
