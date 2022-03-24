import { Movie } from './movie'

export class CommingMovies extends Movie<HTMLElement> {
  movie: any
  dday: number
  constructor(movie: any) {
    super(`
            <li>
              <div class="comming-movie-container">
                <div class="comming-movie-dday"></div>
                <div class="comming-movie-title"> ${movie.title}</div>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="150" height="180"/>
              </div>
            </li>
          `)
    this.movie = movie
    const commingMoviesContainer = document.querySelector(
      '.comming-movies'
    )! as HTMLElement
    this.addMovieTo(commingMoviesContainer)

    this.dday = this.getdDay()
    console.log(this.dday)
    const temp = this.element.querySelector('.comming-movie-dday')! as Element
    temp.innerHTML = `D-${this.dday}`
  }

  getdDay = () => {
    const arr = this.movie.release_date.split('-')
    const date = new Date()
    const realse = new Date(
      arr[0],
      arr[1] - 1,
      arr[2],
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
    const diff = realse.getTime() - date.getTime()
    const dday = diff / (1000 * 60 * 60 * 24) + 1
    return parseInt(String(dday))
  }
}
