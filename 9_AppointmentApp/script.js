const countDownForm = document.getElementById('countDownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');
const countDownEl = document.getElementById('countdown');

const countDownTitleEl = document.getElementById('countdown-title');

const timeEl = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');

//ปุ่ม
const contdownButtonEl = document.getElementById('countdown-button');
const saveBtnEl = document.getElementById('save-btn');
const completeBtnEl = document.getElementById('complete-btn');


//ตัวแปรควบคุมการทำงาน
let countDownTitle = '';
let countDownDate = '';

let countDownValue = Date; //เก็บวันที่เลือกจาก form
let countDownActive; //ตัวนับเวลา
let saveCountDown; //เก็บข้อมูลและวันแจ้งเตือน (object)

//ตัวแปรแปลงหน่วยเวลา
const second = 1000;
const minute = second*60;
const hour = minute*60;
const day= hour*24;

countDownForm.addEventListener('submit',updateCountDown);

function updateCountDown(e){
    e.preventDefault(); 
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value; //เพิ่มค่าเข้าไปในตัวแปรเก็บค่า
    if (countDownTitle ===''){
        alert("ป้อนข้อมูลไม่ครบ");
    }else{
        // เก็บเข้าไปใน local storage
        saveCountDown = {title:countDownTitle,date:countDownDate};
        localStorage.setItem("countDown",JSON.stringify(saveCountDown));
        countDownValue= new Date(countDownDate).getTime(); //ได้เวลาที่ตั้งไว้
        setUpTime();
    }
}

// ฟังก์ชั่นนับเวลาถอยหลัง 
function setUpTime(){
    countDownActive = setInterval(function(){
        //ตั้งเอาไว้ - ปัจจุบัน
        const now = new Date().getTime();
        const distance = countDownValue - now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance%day)/hour);
        const minutes = Math.floor((distance%hour)/minute);
        const seconds = Math.floor((distance%minute)/second);
        inputContainer.hidden = true;
        if (distance<0){
            countDownEl.hidden =true;
            completeEl.hidden = false;
            clearInterval(countDownActive);
            //หมดเวลา
            completeInfoEl.textContent = `${countDownTitle} วันที่ ${countDownDate}`
        }else{
            countDownTitleEl.textContent = `${countDownTitle}`;
            //นับถอยหลังเรื่อยๆ 
            timeEl[0].textContent=`${days}` // เรียก span มา 
            timeEl[1].textContent=`${hours}`
            timeEl[2].textContent=`${minutes}`
            timeEl[3].textContent=`${seconds}`
            countDownEl.hidden =false;
            completeEl.hidden = true;
        }
    },second);
};


//ดึงข้อมูลกรณีบันทึกไว้แล้วเพื่อโชว์ การนับถอยหลัง 
function callDataInStore(){
    if(localStorage.getItem('countDown')){
        inputContainer.hidden =true;
        saveCountDown = JSON.parse(localStorage.getItem('countDown'));
        countDownTitle = saveCountDown.title;
        countDownDate = saveCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        setUpTime();
    }
}
function reset(){
    localStorage.removeItem('countDown'); //ลบผ่าน key
    countDownEl.hidden = true; 
    completeEl.hidden =true;
    inputContainer.hidden = false;
    clearInterval(countDownActive);
    countDownTitle='';
    countDownDate='';

}
callDataInStore();
contdownButtonEl.addEventListener('click',reset);
completeBtnEl.addEventListener('click',reset);