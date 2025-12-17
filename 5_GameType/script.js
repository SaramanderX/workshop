const wordElement = document.getElementById('word');
const textElement = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

// ปุ่ม
const btnlevelEL = document.getElementById('level-btn');
const settingEL = document.getElementById('setting');
const levelFormEL = document.getElementById('level-form');
const levelEL = document.getElementById('level');
const gameoverEL = document.getElementById('gameover-container');

//
const words = ["เศรษฐี","แมว","กำเนิด","ศักดิ์สิทธิ์","กาญจนบุรี"]


// คำต้องเปลี่ยนไปเมื่อป้อนคำถูก คำต้องถูกสุ่มขึ้นมา

// เมื่อเปิดเว็ป
function init(){
    let Use_randomWord = RandomWord(words); //คำสุ่มขึ้นมา
    console.log(Use_randomWord);
    let result_check= CheckMatchWords(Use_randomWord); //ผลการเช็คการเท่ากันของคำ
    console.log(result_check);
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
    return textContent;
    
}


// ฟังก์ชั่น เช็คผลการพิม
function CheckMatchWords(textContent){
    // รับค่าการพิม และเช็คการกดปุ่ม
    textElement.addEventListener('keydown',function(event){
        // เช็คว่าเป็นปุ่ม Enter หรือไม่
        if (event.key ==='Enter'){ // คือการเปิดดูรายงานว่า "ปุ่มที่กดชื่ออะไร"
            const text_input = textElement.value
            console.log(text_input)
            //ถ้า text input ตรงกับ text ที่อยู่หน้าจอ ให้ส่งค่าออกไปเป็นจริง ไม่ใช่ เป็น false
            if(text_input === textContent){
                console.log("matching")
                textElement.value = ''; //เปลี่ยนให้ช่องป้อนเป็นค่าว่างหลังพิมแล้ว enter
                return true;
            }else{
                console.log("un-matching")
                textElement.value = '';//เปลี่ยนให้ช่องป้อนเป็นค่าว่างหลังพิมแล้ว enter
                return false;
            }
        }else{
            return false;
        }
    })
}

init(); 