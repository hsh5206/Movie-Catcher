import TMDB from '../service/tmdb_api'
import MoviePage from './moviePage'

export default class Search {
  tmdb: TMDB
  private results: any
  constructor() {
    this.tmdb = new TMDB(process.env.TMDB_API_KEY)
    const query = document.querySelector('.search-input')! as HTMLInputElement
    query.addEventListener('keyup', () => {
      this.tmdb
        .getSearchResults(`${query.value}`)
        .then((result) => (this.results = result))
        .then(() => this.renderPage())
    })
  }

  renderPage = () => {
    const display = document.querySelector('.search')! as HTMLElement
    if (!display.style.display) return
    if (!this.results) return
    let temp = `<ul class="search-results">`
    const width = document.body.clientWidth
    const division = width > 600 ? 220 : 170
    let num = Number(width / division)
    let k = -1
    this.results.map((movie: any) => {
      k++
      if (k > num) {
        temp += `</ul>`
        k = 0
        temp += `<ul class="search-results">`
      }
      if (!movie.poster_path) {
        temp += `
      <li id="${movie.id}" class="search-movie">
        <img class="search-movie-poster" src="assets/images/defaultPoster.jpeg"/>
        <div class="search-movie-title">${movie.title}</div>
      </li>
      `
      } else {
        temp += `
      <li id="${movie.id}" class="search-movie">
        <img class="search-movie-poster" src="https://image.tmdb.org/t/p/w200${movie.poster_path}"/>
        <div class="search-movie-title">${movie.title}</div>
      </li>
      `
      }
    })
    temp += '</ul>'
    const searchResults = document.querySelector(
      '.search-content'
    )! as HTMLElement
    searchResults.innerHTML = temp
    const w = width > 600 ? 150 : 100
    const h = width > 600 ? 225 : 150
    const searchResultsChild = searchResults.lastElementChild! as HTMLElement
    for (k; k < num - 1; k++)
      searchResultsChild.innerHTML += `<div style="padding:5px; display:block; width:${w}px; height:${h}px"></div>`

    this.addEventEachMovie()
  }

  addEventEachMovie = () => {
    const movies = document.querySelectorAll(
      '.search-movie'
    )! as NodeListOf<HTMLElement>
    for (let i = 0; i < movies.length; i++) {
      movies[i].addEventListener('click', () => {
        console.log(movies[i].id)
        new MoviePage(movies[i].id)
        const moviePopup = document.querySelector(
          '.movie-popup'
        )! as HTMLElement
        moviePopup.style.display = 'flex'
        const body = document.querySelector('body')! as HTMLElement
        body.style.overflow = 'hidden'
      })
    }
  }
}
