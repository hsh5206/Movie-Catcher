'use strict'
import '../style/main.css'
import TMDB from './service/tmdb_api'
import Logout from './login/logout';
import { getFirestore} from 'firebase/firestore/lite';
import { firebaseApp } from './service/firebase';
import { PopularMovie } from './components/popularMovie';
import { NowPlayingMovie } from './components/nowPlayingMovie';
import NowMovieSlide from './function/nowMovieSlide';
import { CommingMovies } from './components/commingMovies';

const db = getFirestore(firebaseApp);
/**슬라이더 */
new NowMovieSlide

/**TMDB */
const tmdb = new TMDB(process.env.TMDB_API_KEY)

// 이거 최신영화로 바꾸고 현재 사영영화 페이지 만들고
// 랭킹 페이지 랭킹 만들기
const nowPlayingMovies = tmdb.getNowPlayingMovies()
nowPlayingMovies.then((list) => list.some((movie, index)=> {
  new NowPlayingMovie({...movie})
  if (index === 4) return true;
  }))

const popularMovies = tmdb.getPopularMovies()
popularMovies.then((list) => list.map((movie, index)=>new PopularMovie({...movie, rank: `${index+1}`})))
/*출시예정 영화 */ // D-day낮은 순으로 정렬해서 렌더링 하기
const commingMovies = tmdb.getCommingMovies()
commingMovies.then((list) => list.map((movie) => new CommingMovies({...movie})))

new Logout
