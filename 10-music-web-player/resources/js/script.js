const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 1;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `public/music/${song}.mp3`;
  cover.src = `public/images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function durationTime(e) {
	const { duration, currentTime } = e.srcElement;
	let seconds;
	let secondsDuration;
    let minutes = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
	 
    minutes = minutes < 10 ? '0'+minutes : minutes;

	function getSeconds(x) {
		if (Math.floor(x) >= 60){
			for (let i = 1; i<=60; i++) {
				if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
					seconds = Math.floor(x) - (60 * i);
					seconds = seconds < 10 ? '0'+seconds : seconds;
				}
			}
		} else {
		 	seconds = Math.floor(x);
		 	seconds = seconds < 10 ? '0'+seconds : seconds;
		 }
	} 

	getSeconds(currentTime, seconds);

	currentTime.innerHTML = minutes +':'+ seconds;

	let minutesDuration = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
	 
    minutesDuration = minutesDuration < 10 ? '0'+minutesDuration : minutesDuration;


	 function getSecondsDuration (x) {
		if (Math.floor(x) >= 60){
			for (let i = 1; i <= 60; i++) {
				if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
					secondsDuration = Math.floor(x) - (60 * i);
					secondsDuration = secondsDuration < 10 ? '0'+secondsDuration : secondsDuration;
				}
			}
		} else {
		 	secondsDuration = (isNaN(duration) === true) ? '0': Math.floor(x);
		 	secondsDuration = secondsDuration < 10 ? '0'+secondsDuration : secondsDuration;
		 }
	} 

	getSecondsDuration(duration);

	duration.innerHTML = minutesDuration +':'+ secondsDuration;
		
};

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', durationTime);
