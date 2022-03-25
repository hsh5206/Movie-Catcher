export interface IMovie {
  attachTo(parent: HTMLElement, position?: InsertPosition): void
}

export class Movie<T extends HTMLElement> {
  protected readonly element: T
  protected movie: any

  constructor(htmml: string, movie: any = null) {
    this.movie = movie
    const template = document.createElement('template')
    template.innerHTML = htmml
    this.element = template.content.firstElementChild! as T
    if (this.movie) {
      this.element.addEventListener('click', () => {
        console.log(this.movie)
      })
    }
  }

  addMovieTo(parent: HTMLElement, position: InsertPosition = 'beforeend') {
    parent.insertAdjacentElement(position, this.element)
  }
}
