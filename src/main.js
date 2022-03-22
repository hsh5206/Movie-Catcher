'use strict'
import '../style/main.css'
import TMDB from './service/tmdb_api'
import Logout from './login/logout';
import { getFirestore} from 'firebase/firestore/lite';
import { firebaseApp } from './service/firebase';

const db = getFirestore(firebaseApp);

const tmdb = new TMDB(process.env.TMDB_API_KEY)
const trendMovies = tmdb.getTrendMovies()
trendMovies.then((list) => list.map((movie)=>console.log(movie.title)))
const popularMovies = tmdb.getPopularMovies()
popularMovies.then((list) => list.map((movie)=>console.log(movie.title)))



new Logout
