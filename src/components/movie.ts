export interface IMovie {
  attachTo(parent: HTMLElement, position?: InsertPosition): void
}

export class Movie<T extends HTMLElement> {
  protected readonly element: T

  constructor(htmml: string) {
    const template = document.createElement('template')
    template.innerHTML = htmml
    this.element = template.content.firstElementChild! as T
  }

  addMovieTo(parent: HTMLElement, position: InsertPosition = 'beforeend') {
    parent.insertAdjacentElement(position, this.element)
  }
}
