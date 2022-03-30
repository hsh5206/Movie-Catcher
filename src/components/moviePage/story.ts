import { Content, IContent } from '../content'

interface IStory extends IContent {
  makePage(): void
}
export default class Story extends Content implements IStory {
  private overview: string
  private movieProviders: any[] = []
  constructor(id: string, overview: string) {
    super()
    this.overview = overview
    this.tmdb
      .getWatchMovieProvider(id)
      .then((providers) => providers?.flatrate)
      .then(
        (providers) =>
          providers &&
          providers.forEach((provider: any) =>
            this.movieProviders.push([
              provider.logo_path,
              provider.provider_name,
            ])
          )
      )
      .then(() => this.makePage())
  }

  makePage() {
    let temp = `
    <div style="height:100%; display:flex; flex-direction:column; justify-content:space-between">
      <div>${this.overview}</div>
      <div style="display:flex; padding:1.2em; justify-content:end; align-items:center">
    `
    if (!this.movieProviders.length) {
      temp += `<div>스트리밍 정보 없음 </div>`
    }
    this.movieProviders.map((content) => {
      temp += `
        <div style="display:flex; flex-direction: column; margin-right:1em; align-items:center">
          <div>${content[1]}</div>
          <img src="https://image.tmdb.org/t/p/w200${content[0]}" width="40" height="40"/>
        </div>
      `
    })
    temp += '</div></div>'
    this.element = temp
    this.renderPage()
  }
}
