export default class Navigation {
  constructor(){
    const homeBtn = document.querySelector('.home-button')
    homeBtn.addEventListener(('click'), ()=> {
      const search = document.querySelector('.search');
      search.style.display='none';
      const calendar = document.querySelector('.calendar');
      calendar.style.display='none';
      const setting = document.querySelector('.setting');
      setting.style.display='none';
      const before = document.querySelector('.nav-clicked');
      before.classList.remove('nav-clicked')
      const home = document.querySelector('.main');
      home.style.display='flex';
      homeBtn.classList.add('nav-clicked')
    })
  
    const searchBtn= document.querySelector('.search-button')
    searchBtn.addEventListener(('click'), ()=> {
      const home = document.querySelector('.main');
      home.style.display='none';
      const calendar = document.querySelector('.calendar');
      calendar.style.display='none';
      const setting = document.querySelector('.setting');
      setting.style.display='none';
      const before = document.querySelector('.nav-clicked');
      before.classList.remove('nav-clicked')
      const search = document.querySelector('.search');
      search.style.display='flex';
      searchBtn.classList.add('nav-clicked')
    })

    const calendarBtn= document.querySelector('.calendar-button')
    calendarBtn.addEventListener(('click'), ()=> {
      const home = document.querySelector('.main');
      home.style.display='none';
      const search = document.querySelector('.search');
      search.style.display='none';
      const setting = document.querySelector('.setting');
      setting.style.display='none';
      const before = document.querySelector('.nav-clicked');
      before.classList.remove('nav-clicked')
      const calendar = document.querySelector('.calendar');
      calendar.style.display='flex';
      calendarBtn.classList.add('nav-clicked')
    })

    const settingBtn= document.querySelector('.setting-button')
    settingBtn.addEventListener(('click'), ()=> {
      const home = document.querySelector('.main');
      home.style.display='none';
      const search = document.querySelector('.search');
      search.style.display='none';
      const calendar = document.querySelector('.calendar');
      calendar.style.display='none';
      const before = document.querySelector('.nav-clicked');
      before.classList.remove('nav-clicked')
      const setting = document.querySelector('.setting');
      setting.style.display='flex';
      settingBtn.classList.add('nav-clicked')
    })

  }
  
}