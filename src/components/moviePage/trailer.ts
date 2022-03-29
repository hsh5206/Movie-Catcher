import { Content, IContent } from './../content'

interface ITrailer extends IContent {
  makePage(): void
}

export default class Trailer extends Content implements ITrailer {
  private videos: any[] = []
  constructor(id: number) {
    super()
    this.tmdb
      .getMovieTrailers(id)
      .then((content) =>
        content.forEach((trail: any) => {
          this.videos.push([trail.name, trail.key])
        })
      )
      .then(() => this.makePage())
  }

  makePage = () => {
    let temp = '<ul class="trailers">'
    if (!this.videos.length) {
      temp += '<div style="width: 100%; text-align:center">정보 없음</div>'
    }
    this.videos.map((video) => {
      temp += `
      <li>
        <div class="trailer-title">${video[0]}</div>
        <iframe
          width="300"
          height="160"
          src="https://www.youtube.com/embed/${video[1]}"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </li>
    `
    })
    temp += '</ul>'
    this.element = temp
    this.renderPage()
  }
}
