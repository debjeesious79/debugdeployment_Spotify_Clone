console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar =  document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongInfo');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs=
[
    {songName: "AhaSlides", filePath: "songs/1.mp3", coverPath: "covers/1.avif"},
    {songName: "‘Umbrella’ by Rihanna featuring Jay-Z", filePath: "songs/2.mp3", coverPath: "covers/2.avif"},
    {songName: "‘Toxic’ by Britney Spears", filePath: "songs/3.mp3", coverPath: "covers/3.avif"},
    {songName: "‘Hits Different’ by Taylor Swift", filePath: "songs/4.mp3", coverPath: "covers/4.avif"},
    {songName: "‘Rolling in the Deep’ by Adele", filePath: "songs/5.mp3", coverPath: "covers/5.avif"},
    {songName: "‘Torn’ by Natalie Imbruglia", filePath: "songs/6.mp3", coverPath: "covers/6.avif"},
    {songName: "‘Dance the Night’ by Dua Lipa", filePath: "songs/7.mp3", coverPath: "covers/7.avif"},
    {songName: "‘Single Ladies (Put a Ring on It)’ by Beyoncé", filePath: "songs/8.mp3", coverPath: "covers/8.avif"},
    {songName: "‘Rehab’ by Amy Winehouse", filePath: "songs/9.mp3", coverPath: "covers/9.avif"},
    {songName: "‘Dancing on My Own’ by Robyn", filePath: "songs/10.mp3", coverPath: "covers/10.avif"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// audioElement.play();

// handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else 
    {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
    gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
    console.log(e.target);
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10)
    {
        songIndex=1;
    }
    else
    {
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1)
    {
        songIndex=10;
    }
    else
    {
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})