function createMovieDetailsCard(movie) {
  const movieDetailContainer = document.getElementById("movieDetail")

  const img = document.createElement("img")
  img.src = movie.Poster
  img.alt = movie.Title

  const h1 = document.createElement("h1")
  h1.textContent = movie.Title

  const genreParagraph = document.createElement("p")
  genreParagraph.innerHTML = "<strong> Genre:</strong>" + movie.Genre

  const plotParagraph = document.createElement("p")
  plotParagraph.innerHTML = "<strong> Plot:</strong>" + movie.Plot

  const directorParagraph = document.createElement("p")
  directorParagraph.innerHTML = "<strong> Director:</strong>" + movie.Director

  const actorsParagraph = document.createElement("p")
  actorsParagraph.innerHTML = "<strong> Actors:</strong>" + movie.Actors

  const backLink = document.createElement("a")
  backLink.href = "index.html"
  backLink.textContent = "⬅️ Back to Fakeflix"

  movieDetailContainer.appendChild(img)
  movieDetailContainer.appendChild(h1)
  movieDetailContainer.appendChild(genreParagraph)
  movieDetailContainer.appendChild(plotParagraph)
  movieDetailContainer.appendChild(directorParagraph)
  movieDetailContainer.appendChild(actorsParagraph)
  movieDetailContainer.appendChild(backLink)
}

async function fetchMovieDetails(imdbID) {
  const apikey = ""
  const response = await fetch("https://www.omdbapi.com/?apikey=" + apikey + "&i=" + imdbID)
  const movie = await response.json()

  return movie
}

document.addEventListener("DOMContentLoaded", async function () {
  // Come leggere il parametro id dall'URL?
  const params = new URLSearchParams(window.location.search)
  const id = params.get("id")
  const movieDetails = await fetchMovieDetails(id)
  console.log(movieDetails)
  createMovieDetailsCard(movieDetails)
})
