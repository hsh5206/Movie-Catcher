import { CommingMovies } from './../components/item/commingMovie'
export default class CommingMovieSort {
  newMovies: any[]
  constructor(movies: any) {
    let newMovies = []
    for (let i = 0; i < movies.length; i++) {
      newMovies.push(this.getdDay(movies[i]))
    }
    this.newMovies = newMovies
    newMovies.sort(function (a, b) {
      return a.dday - b.dday
    })
    this.callCommingMovies()
  }

  private getdDay = (movie: any) => {
    const arr = movie.release_date.split('-')
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
    return { ...movie, dday: parseInt(String(dday)) }
  }

  private callCommingMovies = () => {
    this.newMovies.some((movie, index) => {
      new CommingMovies({ ...movie })
      if (index === 9) return true
    })
  }
}
