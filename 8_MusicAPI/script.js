const music_container = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progress_container = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


const songs =["Contra","HavestMoon","Mario"];
let index=0;

function loadSongs(song){
    title.innerText=`เพลง ${song}.mp3`;
    cover.src = `cover/${song}.jpg`;
    audio.src = `music/${song}.mp3`;
}


loadSongs(songs[index])

// การเล่นเพลง
playBtn.addEventListener('click',()=>{
    // เปลี่ยนสัญญาลักษณ์ก่อนเช็ค
    const isPlay = music_container.classList.contains('play');
    if(isPlay){
        // ถ้าเล่นอยู่ให้ pause เมื่อคลิก
        pauseSong();
        
    }else{
        playSong();
    }
})
// การเปลี่ยนแปลงก่อนหน้า
prevBtn.addEventListener('click',()=>{
    index--; 
    if(index<0){
        index=songs.length-1;
    }
    loadSongs(songs[index]);
    playSong();
})
//การเปลี่ยนเพลงถัดไป
nextBtn.addEventListener('click',nextSong)
function nextSong(){
    index++;
    if(index>songs.length-1){
        index=0;
    }; //เช็คว่าอยู่เพลงสุดท้ายรึยัง
    loadSongs(songs[index]);
    playSong();
}

function playSong(){
    music_container.classList.add('play');
    // เปลี่ยนสัญญาลักษณ์เป็นแบบหยุด เมื่อเพลง add play 
    playBtn.innerHTML=`<i class="fa-solid fa-pause"></i>`;
    // หรือจะใช้วิธีการเพิ่มและลบ class โดยการเข้าถึงผ่าน 
    // playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    // playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    audio.play();

}
function pauseSong(){
    music_container.classList.remove('play');
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    audio.pause();
}

// เชื่อมให้ progress ขยับเมื่อเล่นเพลง
audio.addEventListener('timeupdate',updateProgress);

function updateProgress(e){
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`
}

// กรอเพลง

progress_container.addEventListener('click',setProgress);
function setProgress(e){
    const width = this.clientWidth;
    const clickx = e.offsetX; //ตำแหนางคลิก
    const duration = audio.duration;
    audio.currentTime=(clickx/width)*duration;
}

// เมื่อเล่นเสียงเสร็จ ให้เล่นเพลงถัดไป
audio.addEventListener('ended',nextSong);