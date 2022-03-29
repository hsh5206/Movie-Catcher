import MoviePage from '../moviePage'
import { Content, IContent } from './../content'

interface ISimilar extends IContent {
  makePage(): void
}

export default class Similar extends Content implements ISimilar {
  private similarMovies: any[] = []
  constructor(id: number) {
    super()
    this.tmdb
      .getSimilarMovies(id)
      .then((movies) =>
        movies.some((movie: any, index: number) => {
          this.similarMovies.push([movie.id, movie.title, movie.poster_path])
          if (index === 10) return true
        })
      )
      .then(() => this.makePage())
  }

  makePage = () => {
    let temp = '<ul class="similer-movie-container">'
    this.similarMovies.map((movie) => {
      temp += `
      <li id="${movie[0]} "class="similer-movie">
        <div class="similer-movie-title">${movie[1]}</div>
        <img src="https://image.tmdb.org/t/p/w200${movie[2]}" width="130" height="200"/>
      </li>
    `
    })
    temp += '</ul>'
    this.element = temp
    this.renderPage()
    const similerMovie = document.querySelectorAll(
      '.similer-movie'
    )! as NodeListOf<HTMLLIElement>
    for (let i = 0; i < similerMovie.length; i++) {
      similerMovie[i].addEventListener('click', () => {
        const button = document.querySelector('.back')! as HTMLElement
        button.click()
        new MoviePage(similerMovie[i].id)
        const moviePopup = document.querySelector(
          '.movie-popup'
        )! as HTMLElement
        moviePopup.style.display = 'flex'
      })
    }
  }
}
