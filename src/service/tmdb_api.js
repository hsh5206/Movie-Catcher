export default class TMDB {
  constructor(key){
    this.key = key
    this.requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  }

  async getTopRatedMovies(){
  const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.key}&language=ko&page=1&region=KR`, this.requestOptions)
  const data = await response.json()
  return data.results
  }

  async getPopularMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&language=ko&page=1&region=KR`, this.requestOptions)
    const data = await response.json()
    return data.results
  }

  async getNowPlayingMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.key}&language=ko&page=1&region=KR`, this.requestOptions)
    const data = await response.json()
    return data.results
  }

  async getCommingMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=ko&page=1&region=KR`, this.requestOptions)
    const data = await response.json()
    return data.results
  }

  async getMoreMovieInfo(id){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.key}&language=ko&region=KR`, this.requestOptions)
    const data = await response.json()
    return data
  }

  async getMovieTrailers(id){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.key}&language=ko&region=KR`, this.requestOptions)
    const data = await response.json()
    return data.results
  }
  async getMovieCredits(id){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.key}&language=ko&region=KR`, this.requestOptions)
    const data = await response.json()
    return data.cast
  }
  async getSimilarMovies(id){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${this.key}&language=ko&page=1&region=KR`, this.requestOptions)
    const data = await response.json()
    return data.results
  }
  async getRecomendMovies(id){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.key}&language=ko&page=1region=KR`, this.requestOptions)
    const data = await response.json()
    return data
  }

  async getWatchMovieProvider(id){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${this.key}&language=ko&region=KR`, this.requestOptions)
    const data = await response.json()
    return data.results.KR
  }
}


