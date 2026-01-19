const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const countdown =document.getElementById('countdown');


//ปีปัจจุบัน
const currentYear = new Date().getFullYear();
const newYear = new Date(`January 01 ${currentYear+1} 00:00:00`);

//หาความแตกต่างเพื่อคำนวณเวลา

function updateCountDown(){
    const currentTime = new Date()
    const diff = newYear - currentTime;
    const d=Math.floor(diff/1000/60/60/24); //หาร 1000 milisec /60s /60min /24hr = day
    const hr = Math.floor(diff/1000/60/60)%24;
    const min = Math.floor(diff/1000/60)%60;
    const sec = Math.floor(diff/1000)%60;


    days.innerHTML = d;
    hours.innerHTML = hr<10?'0'+hr: hr;
    minutes.innerHTML = min<10?'0'+min: min; // ternary 
    seconds.innerHTML = sec<10?'0'+sec: sec; 

    console.log(days+' '+seconds);
}

setInterval(updateCountDown,1000); //ทุกๆ 1 วิ จะเรียกใช้ updatecountdown 