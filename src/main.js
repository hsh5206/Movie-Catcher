'use strict'
import '../style/main.css'
import '../assets/defaultPerson.jpeg'
import TMDB from './service/tmdb_api'
import Logout from './nav/logout';
import { getFirestore} from 'firebase/firestore/lite';
import { firebaseApp } from './service/firebase';
import { TopRatedMovie } from './components/item/topRatedMovie';
import { PopularMovie } from './components/item/popularMovie';
import NowMovieSlide from './function/popularMovieSlide';
import { NowMovie } from './components/item/nowMovie';
import CommingMovieSort from './function/comingMovieSort';
import Navigation from './nav/navigation';

const db = getFirestore(firebaseApp);
/**슬라이더 */
new NowMovieSlide

/**TMDB */
const tmdb = new TMDB(process.env.TMDB_API_KEY)
/**인기 영화 */
const popularMovies = tmdb.getPopularMovies()
popularMovies.then((list) => list.some((movie, index)=> {
  new PopularMovie({...movie})
  if (index === 4) return true;
  }))
/**영화 평점 순위 */
const topRatedMovies = tmdb.getTopRatedMovies()
topRatedMovies.then((list) => list.some((movie, index)=> {
    new TopRatedMovie({...movie, rank: `${index+1}`})
    if (index === 9) return true;
}))
/**상영중인 영화 */
const nowPlayingMovies = tmdb.getNowPlayingMovies()
nowPlayingMovies.then((list) => list.some((movie, index)=>{
  new NowMovie({...movie})
  if (index === 9) return true;
}))
/**출시예정 영화 */
const commingMovies = tmdb.getCommingMovies()
commingMovies.then((movies) => new CommingMovieSort([...movies]))

new Navigation
new Logout
