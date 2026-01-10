// operand operator


const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); // ได้ array
const clearBtn = document.getElementById('clear-btn');


// สร้าง obj รูปแบบการคำนวณ
const calculate ={
    "/": (fristNumber,secondNumber)=> secondNumber!=0 ? fristNumber/secondNumber : "error",
    "*": (fristNumber,secondNumber)=> fristNumber * secondNumber,
    "+": (fristNumber,secondNumber)=> fristNumber + secondNumber,
    "-": (fristNumber,secondNumber)=> fristNumber - secondNumber,
    "=": (fristNumber,secondNumber)=> secondNumber
}


//ตัวเลขที่ 1 ตัวดำเนินการ ตัวเลขที่ 2 

let fristValue = 0;
let operatorValue = ''; //ตัวแปรเก็บตัวกำเนินการ
let waitForNext = false; //เก็บสถานะของตัวเลขและตัวดำเนินการ


//กรองข้อมูลโดยเข้าถึงข้อมูลทีละตัว

function setNumberValue(number){
    // ถ้ามีการ ใส่ค่าตัวเลขไปแล้วให้
    if(waitForNext){
        calculatorDisplay.textContent=number;
        waitForNext=false;
    }else{
     // ดึงค่าตัวเลขจากหน้าจอ
    const displayValue = calculatorDisplay.textContent ;
    calculatorDisplay.textContent = displayValue ==='0' ? number : displayValue+number;       
    }
}

function callOperator(operator){
    // ดึงค่าจากหน้าจอ
    const currentValue = Number(calculatorDisplay.textContent);
    //ดักกรณีที่มีการใส่ค่า operator หลัง
    if(operatorValue && waitForNext){
        operatorValue =operator;
        return;
    }

    // เช็คว่ามีการกำหนด ตัวแรกหรือยัง
    if(!fristValue){
        fristValue=currentValue; //ค่าเริ่มต้น
    }else{
        // ส่งค่าตัวแรก และตัวสองเข้าไปใน function ของ calculate โดยค้นผ่าน key value
        const result = calculate[operatorValue](fristValue,currentValue);
        //แสดงค่า
        calculatorDisplay.textContent = result;
        fristValue=result;
        // ถ้าหารได้ 0 แล้วระบบส่งค่า error จะให้ reset
        if(fristValue ==='error'){
            resetAll();
        }
    }
    
    operatorValue = operator; //กำหนดตัวดำเนินการโดยใช้กำหนดตัวแปรลงไป
    waitForNext=true; //รอใส่ตัวเลขตัวที่ 2 ได้ 

}

function callDecimal(decimal){
    //ถ้ามีการกรอกตัวแรกและตัวดำเนินการแล้วจะกรอกทศนิยมไม่ได้
    if(waitForNext) return;
    // กรองก่อนว่ามี จุดอยู่ในช่องแล้วหรือยัง ถ้ามีแล้วไม่ให้พิมซ้ำ โดยใช้การหา string ด้วย .includes
    // .includes('.'): คำสั่งนี้ถามว่า "ในข้อความนั้น มีตัวจุด (.) ผสมอยู่ไหม?"
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
    
}

function resetAll(){
    fristValue = 0;
    operatorValue = '';
    waitForNext = false;
    calculatorDisplay.textContent='0';

}

inputBtn.forEach((input)=>{
    // กรองผ่าน class โดยกำหนดให่ตัวที่ไม่มีคลาสเป็นตัวเลข เนื่องจากไม่ได้กำหนดใน html
    // เนื่องจากเมื่อมี class จะแสดงเลข 1 เมื่อตรวจสอบ length โดยค้นผ่าน classlist
    if (input.classList.length === 0){
        input.addEventListener('click',()=>setNumberValue(input.value));
    }else if (input.classList.contains("operator")){
        input.addEventListener('click',()=>callOperator(input.value));
        // .contain คือเช็คค่าของ text โดยเช็คชื่อ class operator
    }else if (input.classList.contains("decimal")){
        input.addEventListener('click',()=>callDecimal(input.value));
    }
})

clearBtn.addEventListener('click',()=>resetAll());