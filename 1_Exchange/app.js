// เรียกใช้งาน api 

//ตัวเลือก currency
const currency_one = document.getElementById('curreny-primary');
const currency_two = document.getElementById('curreny-secound');

//ช่องกรอกเงิน
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

//อัตราการแลกเปลี่ยน
const rateText = document.getElementById('rate');

// ปุ่มสลับสกุลเงิน
const swapBtn = document.getElementById('btn');

// กำหนด event สำหรับ currency
currency_one.addEventListener('change',CalculateMoney);
currency_two.addEventListener('change',CalculateMoney);

//กำหนด event สำหรับการใส่ค่าตัวเลข
amount_one.addEventListener('input',CalculateMoney);
amount_two.addEventListener('input',CalculateMoney);

//กำหนด event สำหรับการกดปุ่ม
swapBtn.addEventListener('click',SwapCurrency);

function SwapCurrency(){
    const temp = currency_one.value; //ต้นทาง 
    currency_one.value = currency_two.value;
    currency_two.value = temp ; //ปลายทาง

    CalculateMoney();

}

function CalculateMoney(){
    const one = currency_one.value; // รับค่ามากำหนดลงในตัวแปร
    const two = currency_two.value;

    //เรียก api กำหนดต้นทาง ผ่าน fetch
    let url_api = `https://v6.exchangerate-api.com/v6/c21e84793363d281074b110f/latest/${one}`
    fetch(url_api).then(res=>res.json()).then(data=>{
        console.log(data.conversion_rates[two]) //ได้เป็น object ออกมาใน data โดยเข้าถึงผ่าน []
        const rate = data.conversion_rates[two];
        //นำไปแสดงผลในช่องอัตราการแลกเปลี่ยน
        rateText.innerText=`1 ${one} = ${rate} ${two}`
        //การคำนวณ 
        amount_two.value = (amount_one.value*rate).toFixed(2); // toFixed(2) กำหนดทศนิยม 2 ตำแหน่ง

    }) ; //จะ return ค่า .json

    // console.log("สกุลเงินต้นทาง :",one);
    // console.log("สกุลเงินปลายทาง :",two);
    
    //การคำนวณ 
    amount_one
}

CalculateMoney();