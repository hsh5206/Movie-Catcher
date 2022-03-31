import TMDB from './service/tmdb_api'

export default class Search {
  constructor(){
    this.tmdb = new TMDB(process.env.TMDB_API_KEY)
    const query = document.querySelector('.search-input')
    query.addEventListener('keyup', () => {
      this.tmdb.getSearchResults(`${query.value}`)
      .then((result)=>this.results = result)
      .then(()=>this.renderPage())
    })
    
  }

  renderPage= () => {
    console.log(document.querySelector('.search').style.display)
    if (!document.querySelector('.search').style.display) return
    if (!this.results) return
    let temp = `<ul class="search-results">`
    const width = document.body.clientWidth
    const division = width > 600 ? 220 : 170
    let num = parseInt(width / division)
    let k = -1
    this.results.map((movie) => {
      k++
      if (k > num) {
        temp += `</ul>`
        k = 0
        temp += `<ul class="search-results">`
      }
      if(!movie.poster_path){
        temp += `
      <li class="search-movie">
        <img class="search-movie-poster" src="assets/images/defaultPoster.jpeg"/>
        <div class="search-movie-title">${movie.title}</div>
      </li>
      `
      }
      else{
        temp += `
      <li class="search-movie">
        <img class="search-movie-poster" src="https://image.tmdb.org/t/p/w200${movie.poster_path}"/>
        <div class="search-movie-title">${movie.title}</div>
      </li>
      `
      }
      
    })
    temp += '</ul>'
    const searchResults = document.querySelector('.search-content')
    searchResults.innerHTML = temp
    const w = width>600?150:100
    const h = width>600?225:150
    for(k;k<num;k++)searchResults.lastElementChild.innerHTML += `<div style="padding:5px; display:block; width:${w}px; height:${h}px"></div>`
  }
}
