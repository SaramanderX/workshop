
//เข้าถึง element ใน index.html
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// จำลองข้อมูลเพื่อใช้กำหนด


const dataTrasection=[
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่าห้อง",amount:-3000},
    {id:3,text:"เงินเดือน",amount:+18000},
    {id:4,text:"ค่าอาหาร",amount:-500}
]

let transaction=dataTrasection;
// console.log(transaction)

function init(){
    // ดึงราการ oject ทีละอัน 
    transaction.forEach(addDataToList);
    CalculateMoney();
}

//กรองข้อมูล
function addDataToList(transaction){
    // กรองสัญญาลักษณ์ก่อน 
    const symbol = transaction.amount < 0 ?'-':'+'; //ถ้า <0 ให้ - else +
    // สร้าง tag li ขึ้นมา
    const item =document.createElement('li');
    //ปรับให้ตัวเลขมีคอมม่า
    result = numberWithCommas(Math.abs(transaction.amount));
    //กรองค่าก่อน เพื่อเพิ่ม class เข้า ใน li
    const status = transaction.amount <0 ?'minus':'plus';
    item.classList.add(status)


    
    // ใส่ข้อมูลใน li
    // item.innerHTML='ซ่อมรถ<span>- 400</span><button class="delete-btn">X</button>'
    // เพิ่ม math.abs จะทำให้เห็นแค่ - ตัวเดียว
    item.innerHTML=`${transaction.text}<span>${symbol} ${result}</span><button class="delete-btn" onclick="removeData(${transaction.id})">X</button>`;
    
    // โยน li เข้าไปใน list
    list.appendChild(item);
}
//function comma
// Source - https://stackoverflow.com/q
// Posted by Elias Zamaria, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-09, License - CC BY-SA 4.0

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function autoID(){ //สุ่มตัวเลข
    return Math.floor(Math.random()*1000000)
}

console.log(numberWithCommas(1000))
//คำนวณเงิน
function CalculateMoney(){
    //แยกข้อมูล
    const amounts = transaction.map(transaction=>transaction.amount);
    console.log(amounts)
    //กรองข้อมูล โดยใช้ reduce เพื่อวนลูป
    //คำนวณยอดคงเหลือ
    const total = amounts.reduce((result,item)=>(result+=item),0).toFixed(2);

    //คำนวณรายรับ
    const income= amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2);
    console.log(income);

    //คำนวณรายจ่าย
    const expense = (amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2);
    console.log(expense);

    //ปรับตัวเลขให้มี ,
    //แสดงผล
    balance.innerText=`฿`+numberWithCommas(total);
    money_plus.innerText=`฿`+numberWithCommas(income)
    money_minus.innerText=`฿`+numberWithCommas(expense)
}
function AddTransaction(event){
    event.preventDefault();
    //เช็คค่าว่างของช่องกรอกหลังลบช่องว่างซ้ายขวา
    if(text.value.trim()===''|| amount.value.trim()===''){
        alert("กรุณาป้อนข้อมูลให้ครบถ้วน");
    }
    else{
        //+แปลงชนิดข้อมูล
        //นำข้อมูลเข้าไปใน array : transaction
        const data ={
            id:autoID(),
            text:text.value,
            amount:+amount.value 
        }
        transaction.push(data)
        console.log(transaction)
        addDataToList(data)
        CalculateMoney();
        text.value='';
        amount.value=''; //เคลียรค่าว่าง
    }
}
//ลบข้อมูล 
function removeData(id){
    // console.log("delete data",id);
    //เคลียร์ค่าให้ว่างก่อน
    list.innerHTML ='';
    transaction=transaction.filter(transaction=>transaction.id != id) //หา array ที่เหลือ 
    init();
}


//เช็คว่ามีการกดปุ่ม ที่form รึยัง
form.addEventListener('submit',AddTransaction);


// รันเมื่อเปิด browser
init();

