
const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Tu hai kahan',
        cover: 'assets/1.jpeg',
        artist: 'AUR'
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Sajjan Razi',
        cover: 'assets/2.webp',
        artist: 'Satinder Sartaj'
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Meray pas tum ho',
        cover: 'assets/3.jpeg',
        artist: 'Raha Fateh Ali Khan'
    },
    {
        path: 'assets/4.mp3',
        displayName: '295',
        cover: 'assets/4.jpg',
        artist: 'Sidhu Moosay Wala'
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Bachpan Kahan',
        cover: 'assets/5.jpeg',
        artist: 'Himesh Rashamiya'
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Do Bol',
        cover: 'assets/6.jpeg',
        artist: 'Nabeel Shaukat & Aima Baig'
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Dosti',
        cover: 'assets/7.jpeg',
        artist: 'Amit Trivedi'
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Kesariya',
        cover: 'assets/8.jpeg',
        artist: 'Arjit Singh'
    },
    {
        path: 'assets/9.mp3',
        displayName: 'Love is a waste of time',
        cover: 'assets/9.jpeg',
        artist: 'Amitabh Varma'
    },
    {
        path: 'assets/10.mp3',
        displayName: 'Muskaan Jhooti Hai',
        cover: 'assets/10.jpeg',
        artist: 'Suman Sridhar'
    },
    {
        path: 'assets/11.mp3',
        displayName: 'O Bedardiya',
        cover: 'assets/11.jpeg',
        artist: 'Arjeet Singh'
    },
    {
        path: 'assets/12.mp3',
        displayName: 'Pasoori',
        cover: 'assets/12.jpeg',
        artist: 'Shae Gill & ALi Sethi'
    },
    {
        path: 'assets/13.mp3',
        displayName: 'Waka Waka',
        cover: 'assets/13.jpeg',
        artist: 'Shakira'
    },
    {
        path: 'assets/14.mp3',
        displayName: 'Tum Hi Ho',
        cover: 'assets/14.jpeg',
        artist: 'Arjeet Singh'
    },
    {
        path: 'assets/15.mp3',
        displayName: 'Taare Zameen Par',
        cover: 'assets/15.jpeg',
        artist: 'Shankar Ehsaan'
    },
    {
        path: 'assets/16.mp3',
        displayName: 'O Maahi',
        cover: 'assets/16.jpeg',
        artist: 'Arjeet Singh'
    }
    
];

const image = document.getElementById('cover');
const title = document.getElementById('music-title');
const artist = document.getElementById('music-artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const playerProgress = document.getElementById('player-progress');
const prevBtn = document.getElementById('Previous');
const nextBtn = document.getElementById('Next');
const playBtn = document.getElementById('Play');
const background = document.getElementById('bg-img');
const loudnessContainer = document.querySelector('.loudness-container');
const loudnessControl = document.getElementById('loud');
const loudnessSliderContainer = document.querySelector('.loudness-slider-container');
const toggleLoudnessBtn = document.getElementById('toggleLoudness');
const volumeIcon = document.getElementById('volume');
const toggleLoopButton = document.getElementById('toggleLoopBtn');
const disk = document.getElementById('player-img');

const music = new Audio();

let musicIndex = 0;
let isPlaying = false;
let isLooping = false;
let mute = false;

function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
    requestAnimationFrame(updateProgressBar);
    toggleAnimation(true);
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
    toggleAnimation(false);
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
    resetDiskAnimation();
}

function resetDiskAnimation() {
    disk.style.animation = 'none';
    void disk.offsetWidth; 
    disk.style.animation = 'spin 40s linear infinite paused'; 
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    if (isPlaying) {
        const { duration, currentTime } = music;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            if(isNaN(seconds)){
                return "0:00"
            }
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        };
        
        durationEl.textContent = formatTime(duration);
        currentTimeEl.textContent = formatTime(currentTime);

        requestAnimationFrame(updateProgressBar);
    }
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function toggleAnimation(play) {
    if (play) {
        disk.style.animationPlayState = 'running';
    } else {
        disk.style.animationPlayState = 'paused';
    }
}

function setVolume() {
    music.volume = loudnessControl.value;
    updateVolumeIcon();
}

function updateVolumeIcon() {
    if (music.volume === 0) {
        volumeIcon.classList.add('fa-volume-xmark');
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.remove('fa-volume-low');
    } else if (music.volume >= 0 && music.volume <= 0.5) {
        volumeIcon.classList.add('fa-volume-low');
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.remove('fa-volume-xmark');
    } else if (music.volume > 0.5) {
        volumeIcon.classList.add('fa-volume-high');
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.remove('fa-volume-low');
    }
}

function closeVolumeBox(e) {
    if (!loudnessContainer.contains(e.target) && !loudnessSliderContainer.contains(e.target)) {
        loudnessSliderContainer.classList.remove('active');
    }
}


function toggleLoudnessSlider() {
    loudnessSliderContainer.classList.toggle('active');
}

function openLoudnessSlider() {
    loudnessSliderContainer.classList.add('active');
}

function handleKeyDown(e) {
    switch (e.key) {
        case " ":
        case "Space":
            togglePlay();
            break;
        case "ArrowUp":
            music.volume = Math.min(music.volume + 0.1, 1);
            loudnessControl.value = music.volume;
            updateVolumeIcon();
            break;
        case "ArrowDown":
            music.volume = Math.max(music.volume - 0.1, 0);
            loudnessControl.value = music.volume;
            updateVolumeIcon();
            break;
        case "ArrowRight":
            changeMusic(1);
            break;
        case "ArrowLeft":
            changeMusic(-1);
            break;
        case "m":
        case "M":
            mute = !mute;
            mute ? music.volume = 0 : music.volume = 1;
            mute ? loudnessControl.value = 0 : loudnessControl.value = 1;
            updateVolumeIcon();
            break;
        case "r":
        case "l":
            toggleLoop();
            break;
    }
}

function toggleLoop() {
    isLooping = !isLooping;
    music.loop = isLooping;
    toggleLoopButton.firstElementChild.classList.toggle('active', isLooping);
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
playerProgress.addEventListener('click', setProgressBar);
loudnessControl.addEventListener('input', setVolume);
toggleLoudnessBtn.addEventListener('click', toggleLoudnessSlider);
loudnessSliderContainer.addEventListener('mouseleave', ()=>{loudnessSliderContainer.classList.remove('active');});
toggleLoopButton.addEventListener('click', toggleLoop);
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('click', closeVolumeBox);

loadMusic(songs[musicIndex]);
resetDiskAnimation(); // Reset animation on page load
