import MoviePage from './moviePage'

export interface IMovie {
  attachTo(parent: HTMLElement, position?: InsertPosition): void
}

export class Movie<T extends HTMLElement> {
  protected readonly element: T
  protected movie: any

  constructor(html: string, movie: any = null) {
    this.movie = movie
    const template = document.createElement('template')
    template.innerHTML = html
    this.element = template.content.firstElementChild! as T
    if (this.movie) {
      this.element.addEventListener('click', () => {
        const body = document.querySelector('body')! as HTMLElement
        body.style.overflow = 'hidden'
        const moviePage = document.querySelector('.movie-popup')! as HTMLElement
        moviePage.style.display = 'flex'
        new MoviePage(this.movie.id)
      })
    }
  }

  addMovieTo(parent: HTMLElement, position: InsertPosition = 'beforeend') {
    parent.insertAdjacentElement(position, this.element)
  }
}
