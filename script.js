const songs = [
  { title: "Song 1", artist: "Artist 1", src: "songs/song1.mp3" },
  { title: "Song 2", artist: "Artist 2", src: "songs/song2.mp3" },
  { title: "Song 3", artist: "Artist 3", src: "songs/song3.mp3" }
];
let songIndex = 0;
let autoplayEnabled = true;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeControl = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const autoplayCheckbox = document.getElementById("autoplay");
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  updatePlaylistUI();
}
loadSong(songs[songIndex]);
function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}
playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});
audio.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.srcElement;
  let progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  let min = Math.floor(currentTime / 60);
  let sec = Math.floor(currentTime % 60);
  if (sec < 10) sec = `0${sec}`;
  currentTimeEl.textContent = `${min}:${sec}`;

  if (duration) {
    let dMin = Math.floor(duration / 60);
    let dSec = Math.floor(duration % 60);
    if (dSec < 10) dSec = `0${dSec}`;
    durationEl.textContent = `${dMin}:${dSec}`;
  }
});
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});
volumeControl.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});
autoplayCheckbox.addEventListener("change", (e) => {
  autoplayEnabled = e.target.checked;
});
audio.addEventListener("ended", () => {
  if (autoplayEnabled) {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  } else {
    pauseSong();
  }
});
function updatePlaylistUI() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.classList.toggle("active", index === songIndex);
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlist.appendChild(li);
  });
}
updatePlaylistUI();

