export default class NowMovieSlide {
  now_view: number = 0
  interval: NodeJS.Timer
  buttons: NodeListOf<HTMLInputElement>
  constructor() {
    console.log(this.now_view)
    this.buttons = document.querySelectorAll(
      '.now-movies-button'
    )! as NodeListOf<HTMLInputElement>
    for (let i = 0; i < this.buttons.length; i++) {
      console.log(this.buttons.item(i))
      this.buttons.item(i).addEventListener('click', () => {
        const now = document.querySelector('.now-movies')! as HTMLElement
        now.style.transform = `translate(-${i * 100}vw)`
        this.buttons.item(this.now_view).checked = false
        this.now_view = i
        this.buttons.item(this.now_view).checked = true
        clearInterval(this.interval)
        this.interval = setInterval(this.moveBanner, 4000)
      })
    }
    this.interval = setInterval(this.moveBanner, 4000)
  }

  moveBanner = () => {
    const now = document.querySelector('.now-movies')! as HTMLElement
    this.buttons.item(this.now_view).checked = false
    if (this.now_view !== 4) {
      now.style.transform = `translate(-${(this.now_view + 1) * 100}vw)`
      this.now_view += 1
    } else {
      now.style.transform = 'translate(-0vw)'
      this.now_view = 0
    }
    this.buttons.item(this.now_view).checked = true
  }
}
