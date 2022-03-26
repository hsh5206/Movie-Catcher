import TMDB from '../service/tmdb_api'

export interface IContent {
  renderPage(): any
}

export class Content implements IContent {
  protected element: string
  protected parent: HTMLElement
  protected tmdb: TMDB
  constructor() {
    this.element = 'p'
    this.parent = document.querySelector('.movie-content')! as HTMLElement
    this.tmdb = new TMDB(process.env.TMDB_API_KEY)
  }

  renderPage = () => {
    this.parent.innerHTML = this.element
  }
}
