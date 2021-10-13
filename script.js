let songs = [
    {
        id: 1,
        songName: "Again",
        filePath: "./songs/1.mp3",
        coverPath: "covers/1.jpg"
    },
    {
        id: 2,
        songName: "Heroes-janji",
        filePath: "./songs/2.mp3",
        coverPath: "covers/2.jpg"
    },
    {
        id: 3,
        songName: "Mortals",
        filePath: "./songs/3.mp3",
        coverPath: "covers/3.jpg"
    },
    {
        id: 4,
        songName: "Find You",
        filePath: "./songs/4.mp3",
        coverPath: "covers/4.jpg"
    },
    {
        id: 5,
        songName: "DEAF-KEV",
        filePath: "./songs/5.mp3",
        coverPath: "covers/5.jpg"
    },
    {
        id: 6,
        songName: "HMMMMMMMM",
        filePath: "./songs/6.mp3",
        coverPath: "covers/6.jpg"
    },
    {
        id: 7,
        songName: "You",
        filePath: "./songs/7.mp3",
        coverPath: "covers/7.jpg"
    },
    {
        id: 8,
        songName: "Lovely",
        filePath: "./songs/8.mp3",
        coverPath: "covers/8.jpg"
    },
    {
        id: 9,
        songName: "Daoko",
        filePath: "./songs/9.mp3",
        coverPath: "covers/9.jpg"
    }
];
//audioElement.play();

let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let audioElement = new Audio('./songs/1.mp3');
let progressBar = document.getElementById('myProgressBar');
let playGif = document.querySelector('.image-container img');
let songsContainer = document.querySelector('.song-list-container');
let songInfo = document.querySelector('.song-info span');
let nextButton = document.querySelector('#next');
let prevButton = document.querySelector('#prev');

//Adding song-list to dom
songsContainer.innerHTML = songs.map(song => {
    return (
        `<div class="song-item">
            <img src="${song.coverPath}" alt="${song.songName}"/>
            <span>${song.songName}</span>
            <div class="song-list-play"><i class="fi fi-rr-play" data-songId=${song.id}></i></div>
        </div>`
    )
}).join('');

let songPlay = document.querySelectorAll('.song-list-play');

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    //Update seekbar
    let progress = audioElement.currentTime / audioElement.duration * 100;
    progressBar.value = progress;
});

//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if(!audioElement) {return;}
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fi-rr-play');
        masterPlay.classList.add('fi-rr-pause');
        playGif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fi-rr-pause');
        masterPlay.classList.add('fi-rr-play');
        playGif.style.opacity = 0;
    }
});


//change progress bar
progressBar.addEventListener('change', (e) => {
    console.log(e);
    const percent = e.target.value;
    const duration = percent * audioElement.duration / 100;
    audioElement.currentTime = duration;
});

//song play button 
songPlay.forEach((songPlayButton) => {
    songPlayButton.addEventListener('click', (e) => {
        const songId = e.target.getAttribute('data-songId');
        audioElement.pause();
        audioElement = new Audio(`./songs/${songId}.mp3`);
        songInfo.innerHTML = songs[songId - 1].songName;
        masterPlay.click();
    }
)});

//next
