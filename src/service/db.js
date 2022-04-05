import {getDatabase, ref, set, remove, onValue, off} from 'firebase/database'
import { firebaseApp } from './firebase';

export default class DB {
  constructor(){
    this.db = getDatabase(firebaseApp)
    this.id = sessionStorage.getItem('id')
  }

  syncCards = (movieID, date, func) => {
    const query = ref(this.db, `${this.id}/${date}/${movieID}`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && func(value);
    });
    return () => off(query);
  }

  renderCardToCalendar = (date, func) => {
    const query = ref(this.db, `${this.id}/${date}`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && func(value);
    });
    return () => off(query);
  }

  addCard = (movieID, date,data) => {
    set(ref(this.db, `${this.id}/${date}/${movieID}`), {data})
  }
  removeCard = (movieID, date) => {
    remove(ref(this.db, `${this.id}/${date}/${movieID}`))
  }
}