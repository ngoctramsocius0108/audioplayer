const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const preBtn = $('.btn-backward');
const nextBtn = $('.btn-forward');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const songActive = $('.song.active');
const currentTimeSeek = $('.currentTime');
const durationTimeSeek = $('.durationTime');
const playlist = $('.playlist');
const PLAYER_STOGARE_KEY = "CD_PLAYER";
const volumesider = $('.volumesider');
const volumeBtn = $('.volumeBtn');
const volumeRange = $('.volume'); 
const volumeValue = $('.value');


const app ={
  currentIndex: 0,
  isPlaying: false,
  isRandom:false,
  isRepeat: false,
  isMute: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STOGARE_KEY)) || {},
  songs: [
     {
        name: 'Sống xa anh chẳng dễ dàng',
        singer: ' Bảo Anh',
        path: './assets/music/song14.mp3',
        image: './assets/img/14.jpg'
      },
      
      {
        name: 'Nhắm mắt thấy mùa hè',
        singer: 'Hồ Tiến Đạt x Nguyên Hà',
        path: './assets/music/song15.mp3',
        image: './assets/img/15.jpg'
      },

    {
        name: '3107-1',
        singer: ' W/n, Dương Nâu',
        path: './assets/music/song1.mp3',
        image: './assets/img/1.jpg'
      },
    
     {
        name: 'Đi Đi Đi',
        singer: 'NevaDa',
        path: './assets/music/song12.mp3',
        image: './assets/img/12.jpg'
      },
      {
        name: 'Tình sầu thiên thu muôn lối',
        singer: 'Doãn Hiếu',
        path: './assets/music/song2.mp3',
        image: './assets/img/2.jpg'
      },
      {
        name: 'Hạ còn vương nắng',
        singer: 'Datkaa,Kido',
        path: './assets/music/song3.mp3',
        image: './assets/img/3.jpg'
      },
      {
        name: 'Tha Thứ',
        singer: 'Khánh Phương',
        path: './assets/music/song4.mp3',
        image: './assets/img/4.jpg'
      },
      {
        name: 'Cô Gái M52',
        singer: 'Huy Ft Tùng Viu ',
        path: './assets/music/song5.mp3',
        image: './assets/img/5.jpg'
      },
      {
        name: 'Cùng Anh',
        singer: 'Ngoc Dolil X NIB ',
        path: './assets/music/song6.mp3',
        image: './assets/img/6.jpg'
      },
      {
        name: 'Người Âm Phủ',
        singer: 'Osad Ft VRT',
        path: './assets/music/song7.mp3',
        image: './assets/img/7.jpg'
      },
      {
        name: 'Người Lạ Ơi',
        singer: 'Superbrothers x Karik x Orange',
        path: './assets/music/song8.mp3',
        image: './assets/img/8.jpg'
      },
      {
        name: 'Ai Đưa Em Về',
        singer: 'TIA x Lê Thiện Hiếu',
        path: './assets/music/song9.mp3',
        image: './assets/img/9.jpg'
      },
      {
        name: 'Liệu Giờ',
        singer: '( WHAT IF ? ) x Venn ( Prod. KayT )',
        path: './assets/music/song10.mp3',
        image: './assets/img/10.jpg'
      },
      {
        name: 'Bài Toán Tình Yêu',
        singer: 'Akira Phan',
        path: './assets/music/song11.mp3',
        image: './assets/img/11.jpg'
      },
  ],
  //storing user's data
  setConfig: function(key, value){
    this.config[key] = value;
    localStorage.setItem(PLAYER_STOGARE_KEY, JSON.stringify(this.config));
  },
  // render playlist
  render: function(){
    const htmls = this.songs.map((song, index) =>{
      return `
        <div class="song ${index === this.currentIndex ? 'active' : ''} "data-index="${index}">
          <div class="song-thumb" style="background-image: url(${song.image})">
          </div>
          <div class="song-body">
            <h3 class="song-title">${song.name}</h3>
            <p class="song-author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `
    })
    playlist.innerHTML = htmls.join('');
  },
  // event listeners
  handleEvents: function(){
    const _this = this;

    // handling zoom in and out CD thumb       
    const cdWidth = cd.offsetWidth; /*cách xem chiều rộng của element gồm padding, border, margin*/
    document.onscroll = function(){
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth/cdWidth;
    }
    //handling CD thumb play/pause
    const cdThumbAnimate = cdThumb.animate([
      {transform: 'rotate(360deg)'} //style
    ],
    {
      duration: 10000, //speed (10sec)
      iterations: Infinity // loop
    })
    cdThumbAnimate.pause(); //default pause

    // handling click play
    playBtn.onclick = function(){
      if(_this.isPlaying){
        audio.pause()
      }else{
        audio.play()
      }
    }
    //playing song
    audio.onplay = function(){
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play() //song play, cd thumb plays
    }
    //pausing song
    audio.onpause = function(){
      _this.isPlaying = false;
        player.classList.remove('playing');
        cdThumbAnimate.pause();
    }
    //volume on/off 
    volumeBtn.onclick = function(e){
        _this.isMute =! _this.isMute;
        _this.setVolume();
        _this.setConfig('isMute', _this.isMute);
    }
    // changing volume value
    volumeRange.oninput = function(){
      volumeValue.textContent = volumeRange.value;
      audio.volume = volumeRange.value / 100;
      _this.setConfig('volumeValue', _this.volumeRange.value);
    }

    //changing song progress, calculate progress percent of song
    audio.ontimeupdate = function(){
      if(audio.duration){
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercent;
        currentTimeSeek.innerText = _this.seekTimeUpdate(audio.currentTime);
        durationTimeSeek.innerText = _this.seekTimeUpdate(audio.duration);
      }
    }
    
    //pause/play when pressing space bar
    document.onkeydown = function(e){
      const space = e.keyCode;
      if (space === 32){
        e.preventDefault()
        _this.isPlaying ?  audio.pause() : audio.play();
      }    
    }
    
    //handling seek songs
    progress.onchange = function(e){
      const seekTime = audio.duration/100 * e.target.value;
      audio.currentTime = seekTime; 
    }

    // next button
    nextBtn.onclick = function(){
      if(_this.isRandom){
        _this.randomSong();
      } else{
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scollToActiveSong();
    }

    //preview songs
    preBtn.onclick = function(){
      if(_this.isRandom){
        _this.randomSong();
      } else{
        _this.preSong();
      }       
      audio.play();
      _this.render();
      _this.scollToActiveSong();
    }

    //random songs
    randomBtn.onclick = function(e){
      _this.isRandom =! _this.isRandom,
      _this.setConfig('isRandom',_this.isRandom),
      randomBtn.classList.toggle('active', _this.isRandom); //toggle classlist 
    }

     //repeat songs
     repeatBtn.onclick = function(e){
      _this.isRepeat =! _this.isRepeat
      _this.setConfig('isRepeat',_this.isRepeat),
      repeatBtn.classList.toggle('active', _this.isRepeat); //toggle classlist 
    }

    //auto next song
    audio.onended = function(){
      if (_this.isRepeat){
        audio.play();
      }else{
        nextBtn.click();
      }
    }

    //click playlist to move a nex song
    playlist.onclick = function(e){
      const songNode = e.target.closest('.song:not(.active)');
      if (songNode || e.target.closest('.option')){
        //handling when click on song
        if (songNode){
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
         _this.scollToActiveSong();
        }
        //handling when click on option
      }
    }
  },

    
// ========================

  // define properties for object
  defineProperties: function(){ 
    Object.defineProperty(this,'currentSong', {
      get: function(){
        return this.songs[this.currentIndex];
      }
    })
  },

  // loading current song
  loadCurrentSong: function(){
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    //console.log(heading, cdThumb, audio);
  },

  //load Config
  loadConfig: function(){
    this.isRepeat = this.config.isRepeat;
    this.isRandom = this.config.isRandom;
    this.isMute = this.config.isMute;
  },

  //next song
  nextSong: function(){
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length){
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  // preview song
  preSong: function(){
    this.currentIndex--;
    if(this.currentIndex < 0){
      this.currentIndex = this.songs.length -1;
    }
    this.loadCurrentSong();
  },

  //random songs
  randomSong: function(){
    let newIndex;
    do{
      newIndex = Math.floor(Math.random() * this.songs.length)
    }while (newIndex === this.currentIndex)
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  //scoll to active song
  scollToActiveSong: function(){
    setTimeout(() =>{
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        
      })
    }, 300) 
  },
  // time update
  seekTimeUpdate: function(time) {
    const min = Math.floor(time/60);
    const sec = Math.floor(time) - min * 60;
    const mins = min < 10 ? `0${min}` : min;
    const secs = sec < 10 ? `0${sec}` : sec;
    return [`${mins}:${secs}`];
  },
  // set volumeRange
  setVolume: function(){
    
    if (this.isMute){
      audio.muted = false;
      volumesider.classList.remove('active');
    }else{
      audio.muted = true;
      volumesider.classList.add('active');
    }
  },

  start: function(){
    //loading  Config
    this.loadConfig()
    // render playlist
    this.render()

    //define object's properties
    this.defineProperties()

    //handling events
    this.handleEvents()

    //loading first song
    this.loadCurrentSong()

    // display first status of event
    randomBtn.classList.toggle('active', this.isRandom); 
    repeatBtn.classList.toggle('active', this.isRepeat);
    volumeBtn.classList.toggle('active', this.isMute);
  }
}
app.start()
