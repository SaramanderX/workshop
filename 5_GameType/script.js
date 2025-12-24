const wordElement = document.getElementById('word');
const textElement = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const score_final = document.getElementById('score_final');

// ปุ่ม
const btnlevelEL = document.getElementById('level-btn');
const settingEL = document.getElementById('setting');
const btnrestartEL = document.getElementById('btn-startagain');

const levelFormEL = document.getElementById('level-form');
const levelEL = document.getElementById('level');
const gameoverEL = document.getElementById('gameover-container');


//
const words_1 = ["แมว","กำเนิด","ปลาหมอ","หมา"]
const words_3 = ["ศักดิ์สิทธิ์","เศรษฐี","วงศ์ผู้ดี","กาญจนบุรี"]

let wordsetting = words_1;
let result_matching = [] //ที่รับค่าผลการ matching
// คำต้องเปลี่ยนไปเมื่อป้อนคำถูก คำต้องถูกสุ่มขึ้นมา
let time = 8; // เวลา defualt


// เมื่อเปิดเว็ป
function init(){
    textElement.focus();
    gameoverEL.style.display='none';
    RandomWord(wordsetting); //คำสุ่มขึ้นมา
    CheckMatchWords(); //ผลการเช็คการเท่ากันของคำ แล้วทำการ เพิ่มค่าสามาชิกใน result_matching
    console.log(result_matching);
}

// สุ่มคำโดยสุ่มค่า index และใช้ value จาก array 
function RandomWord(w){
    // สุ่ม  index โดยใช้ ค่าปัดเศษลงด้วย Math.floor() เพื่อใช้ดึงสมาชิกใน array
    let index_random = Math.floor(Math.random()*w.length);
    // console.log(index_random);
    const words_random = w[index_random];
    //แสดงผลออกไปที่ UI ด้วย innerText
    wordElement.innerText= words_random;
    //เช็คผลเมื่อผู้ใช้กรอกคำแล้วถูกต้อง โดยโยนค่าที่สุ่มมาแล้วเข้าไปเช็คผลใน function CheckMatchWords
    let textContent= wordElement.textContent
    Timing(); // เมื่อมีการเปลี่ยนคำให้เวลาทำงานใหม่
    return textContent;
    
}


// ฟังก์ชั่น เช็คผลการพิม
function CheckMatchWords(){
    // รับค่าการพิม และเช็คการกดปุ่ม
    textElement.addEventListener('keydown',function(event){
        // เช็คว่าเป็นปุ่ม Enter หรือไม่
        if (event.key ==='Enter'){ // คือการเปิดดูรายงานว่า "ปุ่มที่กดชื่ออะไร"
            const text_input = textElement.value
            console.log(text_input)
            //ถ้า text input ตรงกับ text ที่อยู่หน้าจอ ให้ส่งค่าออกไปเป็นจริง ไม่ใช่ เป็น false
            //เมื่อการ enter เรียก function เวลา
            if(text_input === wordElement.textContent){
                result_matching.push("matching") //เพิ่มค่าเข้าไปในสมาชิก array
                let result = "matching"
                console.log(result)
                textElement.value = ''; //เปลี่ยนให้ช่องป้อนเป็นค่าว่างหลังพิมแล้ว enter
                // ทำการสุ่มคำใหม่เมื่อถูกต้อง
                RandomWord(wordsetting);
                //ระบบเพิ่มคะแนน
                score_manage(result);
                console.log("array เพิ่มสมาชิก",result_matching);
            }else{
                result_matching.push("un-matching")
                console.log("un-matching")
                textElement.value = '';//เปลี่ยนให้ช่องป้อนเป็นค่าว่างหลังพิมแล้ว enter
            }
        }
    })
}
// ระบบเพิ่มคะแนน 
function score_manage(result){
    score = parseInt(scoreElement.innerText); //เมื่อรับค่ามาจาก innertext จะได้ string ต้องแปลงเป็น number ด้วย parseInt
    if (result === "matching"){
        score+=10;
        console.log(score);
        scoreElement.innerText = `${score}` //เพิ่มค่าแล้วนำไปแสดงที่ html หน้าเกม 
        return score;
    }else{
        console.log(score);
    }
}
// 1. ประกาศตัวแปรเก็บ "ตัวจับเวลา" ไว้ข้างนอกสุด (Global)
// เพื่อให้ทุกฟังก์ชันมองเห็นและสั่งหยุดมันได้
let timeInterval;

//ระบบเวลา ระบบนับถอยหลัง" (Countdown Timer) : setInterval ให้เรียกใช้ funtion ตามเวลาที่กำหนด clearIntervalหยุด function
function Timing(){
    //ถ้าโหมดง่าย 8 วิ พิมได้ + 3วิ
    // ถ้าโหมดปานกลาง 6วิ พิมได้+ 2วิ
    // ถ้าโหมดยาก 4 วิ + 2วิ

    // กฎเหล็ก: สั่งหยุดตัวจับเวลาเก่าก่อนเสมอ! (ถ้ามี)
    // ถ้าไม่สั่งบรรทัดนี้ "ผีนาฬิกา" จะโผล่มาซ้อนกัน
    clearInterval(timeInterval);

    let add_time=0;
    // เพิ่มค่าเวลาที่ตอบถูกให้กับ เวลาเริ่มต้น
    //เพิ่มเวลา เมื่อตอบถูก
    if (result_matching.at(-1)==="matching"){
        add_time = 3;
    }    
    
    // รวมเวลาเริ่มต้นใหม่ (เช่น 15 + 3 = 18)
    time +=add_time;

    timeElement.innerText = time;

    timeInterval = setInterval(updateTimer,1000); //ทุก 1000 มิลิวิ ให้เรียก function updatetime
    function updateTimer(){

        time-- // 1.ลดเวลา
        timeElement.innerText = time ; //2.แสดงผลเลข time ใหม่
        // 3. เช็คว่าหมดเวลาหรือยัง?
        if (time<=0){
            clearInterval(timeInterval); //หยุดการนับเวลาหรือการเรียก function
            GameOver(); //function เรียกหน้า เมื่อจบเกม
            btnrestartEL.addEventListener('click',Restart);
        };
    };
};

function GameOver(){
    // แบบคำสั่ง: element.style.ชื่อProperty = "ค่าที่ต้องการ";
    gameoverEL.style.display='flex';
    score = scoreElement.textContent //เข้าถึงค่าคะแนนที่บันทึกไว้ที่บันทึกไว้ล่าสุด
    score_final.innerText = `${score}`
    
}
//เริ่มเกมใหม่
function Restart(){
    gameoverEL.style.display='none';
    // reset 
    result_matching = [] //ที่รับค่าผลการ matching ให้เป็นค่าว่าง
    // setting ค่า
    ModeSelction();
    // เริ่มเกม
    init();
}
//Mode selection
function ModeSelction(){
    // easyMode mediumMode hardMode
    level_ = levelEL.value 
    levelEL.addEventListener('change',ReadLevel)
    function ReadLevel(){
        if (levelEL.value==='easy'){
            //ให้ปรับเวลาเป็น 8s
            time = 8;
            wordsetting = words_1 ; 
            init();
        }else if(levelEL.value==='medium'){
            // ให้ปรับเวลาเป็น 6s
            time = 6;
            wordsetting =words_1 ;
            init();
        }else if(levelEL.value==='hard'){
            //ให้ปรับเวลาเป็น 6s และเปลี่ยนชุดคำ
            time = 6
            wordsetting = words_3 ; 
            init(); //เริ่มเกมใหม่
        }else{
            time =8
            wordsetting =words_1
            init();
        }
        
    };
}

//  ควบคุมปุ่มสำหรับเลือกระดับความยาก


init(); 