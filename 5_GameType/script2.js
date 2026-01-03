const wordElement = document.getElementById('word');
const textElement = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const score_final = document.getElementById('score_final');

// ปุ่ม
const btnlevelEL = document.getElementById('level-btn');
const settingEL = document.getElementById('setting');
const btnrestartEL = document.getElementById('btn-restart');

const levelFormEL = document.getElementById('level-form');
const levelEL = document.getElementById('level');
const gameoverEL = document.getElementById('gameover-container');


const words = ["หมา","แมว","ปลาวาฬ","วินัย","ทำได้"]

let randomText; //ประกาศตัวแปร
let score=0;
let time=10; //  easy=> 15 ,medium=>10 , hard => 5
let level = 'medium';

let saveMode; 
const timeInterval = setInterval(updateTime,1000);

function getRandomWord(){ // สุ่มคำ
    return words[Math.floor(Math.random()*words.length)] //ใช้ math.floor เพื่อปัด index ลง
}

function displayWordToUi(){
    randomText = getRandomWord(); //สุ่มคำมาใส่ตัวแปร แล้วไปใส่ใน innerHTML
    wordElement.innerHTML = randomText ;
    timeElement.innerText = time; //ผลเวลาเริ่มต้น
}

//เปรียบเทียบข้อความ
textElement.addEventListener('input',(e)=>{
   inputText = e.target.value; //ดูข้อความโดยเมื่อพิมจะเช็คเลย

   if (inputText === randomText){
         //เมื่อตอบถูก
        if (level === 'easy'){
            time+=5;
        } else if(level ==='medium'){
            time+=3;
        }else if(level==='hard'){
            time+=2;
        }
        displayWordToUi();
        e.target.value = ''; //กำหนดให้เป็นค่าว่าง
        updateScore();
   }
})

function updateScore(){
    score+=10;
    scoreElement.innerText = score ; 
}

function updateTime(){
    time--
    timeElement.innerText = time ;
    if (time <=0){
        clearInterval(timeInterval); //หยุดเดินเวลา
        GameOver();
    }
}

function GameOver(){
    gameoverEL.style.display = 'flex';
    score_final.innerText = score ;
}

function startGame(){
    // set คะแนนแก้บัคเปลี่ยน mode ตอนเล่นแล้วไม่เป็น 0
    score =0;
    displayWordToUi();
    // ดึงค่าสถานะของ mode มาเช็ค 
    //เงื่อนไข ? (ถ้าจริงทำอันนี้) : (ถ้าเท็จทำอันนี้)
    saveMode = localStorage.getItem('mode') !==null ? localStorage.getItem('mode') : 'medium' ; 
    //ถ้าเช็คว่าสถานะ local stotrage ไม่ว่าง ให้ดึงค่ามา
    levelEL.value = saveMode ; 
    level = saveMode ; // เก็บค่าสถานะของ mode ไว้
    // ตั้งเวลาก่อนที่จะเริ่มเกม
    if (level === 'easy'){
        time = 15;
    } else if(level ==='medium'){
        time = 10;
    }else if(level==='hard'){
        time = 5;
    }
    displayWordToUi();
}


btnlevelEL.addEventListener('click',()=>{
    settingEL.classList.toggle('hide');
})

//จัดการสถานะ level โดยบันทึกไว้ใน บราวเซอร์
levelEL.addEventListener('change',(e)=>{
    level = e.target.value; 
    localStorage.setItem("mode",level); // เก็บไว้ใน local storage
    startGame(); //เริ่มเกมใหม่เมื่อมีการเลือก

});


textElement.focus(); //ให้ cursor กระพริบแล้วพร้อมจัดการได้เลย  
startGame();