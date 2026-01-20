const usernameEL = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEL = document.getElementById('password');
const passwordEL_confirm = document.getElementById('password-confirm');

const formEL = document.getElementById('form');

const toggleIcons = document.querySelectorAll('.password-box i');

// ดักจับการพิมพ์ที่ช่อง Password เช็คช่องพิมแบบ realtime
// Event 'blur' (เมื่อเมาส์คลิกออกจากช่อง):
//เหตุการณ์ input จะทำงาน ทุกครั้งที่คุณกดแป้นพิมพ์ (พิมพ์เพิ่ม หรือ ลบออก มันจะทำงานทันที)
passwordEL.addEventListener('input', function() {
    
    // 1. เช็คความยาวก่อน

    if (passwordEL.value.length < 8 || passwordEL.value.length > 20) {
        // ถ้าความยาวไม่ได้ ให้ฟ้องเรื่องความยาว
        passwordCheckLength(passwordEL, 8, 20);
    }else{
        // 2. ถ้าความยาวผ่านแล้ว ค่อยเช็คว่ามีตัวเลขผสมไหม
        checkPasswordMix(passwordEL);
    }
    
    // // (แถม) ถ้ามีการแก้ไขรหัสหลัก ก็ควรเช็คช่องยืนยันด้วยว่ายังตรงกันอยู่ไหม
    // if(passwordEL_confirm.value !== "") {
    //     checkPasswordsMatch(passwordEL, passwordEL_confirm);
    // }
});

// ดักจับช่อง ยืนยันรหัสผ่าน (Confirm Password)
passwordEL_confirm.addEventListener('input', function() {
    checkPasswordsMatch(passwordEL, passwordEL_confirm);
});



// เมื่อผู้ใช้กด submit มา 
formEL.addEventListener('submit',function(e){
    // สำคัญมาก! ต้องสั่งบรรทัดนี้เพื่อ "ห้ามไม่ให้เว็บรีเฟรช"
    e.preventDefault();
    // 1. ตรวจสอบ Username (5-15 ตัว)
    usernameValidate(usernameEL,5,15);
    // 2. ตรวจสอบ Password (8-20)
    passwordCheckLength(passwordEL,8,20);
    checkEmail(emailEl);
    passwordCheckMatch(passwordEL,passwordEL_confirm);
})

//ตาเปิดปิดเพื่อดูรหัสผ่าน
toggleIcons.forEach((icon)=>{
    icon.addEventListener('click',function(){
        // --- ส่วนที่ 1: หาตัว Input ที่อยู่ข้างหน้าไอคอนนี้ ---
        // previousElementSibling คือพี่น้องตัวก่อนหน้า (ในที่นี้คือ <input>)
        const inputField = this.previousElementSibling;
        //คำสั่งนี้บอกว่า "ช่วยไปจับตัว element ที่วางอยู่ ข้างหน้า ฉันหน่อย" (ซึ่งใน HTML ของคุณ <input> วางอยู่หน้า <i> พอดีเป๊ะ)
        // --- ส่วนที่ 2: เช็คสถานะและสลับ icon ---
        
        // ตรวจสอบว่าปัจจุบัน icon มีคลาส 'fa-eye' อยู่หรือไม่
        if (this.classList.contains('fa-eye')) {
            
            // ถ้าเป็นรูปตาเปิด -> เปลี่ยนเป็นตาปิด (slash)
            this.classList.replace('fa-eye', 'fa-eye-slash');
            
            // เปลี่ยน input ให้เป็น text (เพื่อให้มองเห็นรหัส)
            inputField.type = 'text';
            
        } else {
            // ถ้าเป็นรูปตาปิด -> เปลี่ยนกลับเป็นตาเปิด
            this.classList.replace('fa-eye-slash', 'fa-eye');
            // เปลี่ยน input กลับเป็น password (ซ่อนรหัส)
            inputField.type = 'password';
        }
    })
})
//คำสั่ง .closest('.form-control') จะฉลาดมาก มันจะวิ่งหาขึ้นไปเรื่อยๆ จนกว่าจะเจอ Class ที่ชื่อว่า form-control ไม่ว่าจะซ้อนกี่ชั้นก็ตาม
// ฟังก์ชัน: แสดง Error (ขอบแดง + ข้อความ)
function showError(input, message){
    const formControl = input.closest('.form-control'); // ถอยขึ้นไปหา div แม่ (.form-control)
    formControl.className ='form-control error'; // ใส่ class error เข้าไปที่ element แม่
    const ErrorMsg = formControl.querySelector('.error-msg'); // หาที่อยู่ของข้อความ ที่อยู่ในตัว parent Element
    ErrorMsg.innerText = message;
}
// ฟังก์ชัน: แสดง Success (ขอบเขียว)
function showSuccess(input) {
    const formControl = input.closest('.form-control');
    formControl.className = 'form-control success'; // ใส่ class success เปลี่ยนชื่อเลย ไม่ใช่ add เข้าไป 
}
//function การกรอง
// input = ช่อง input, min = ต่ำสุดกี่ตัว, max = สูงสุดกี่ตัว
function usernameValidate(input,min,max){
    //ถ้า usernameEL มีจำนวนตัวอักษรน้อยกว่า min(8) 
    if(input.value.length<min){
        showError(input,`Username ต้องมีไม่น้อยกว่า ${min} ตัวอักษร`); //ส่งค่ากลับไปเรียก error
    }else if(input.value.length>max){
        showError(input,`Username ต้องมีไม่เกิน ${max} ตัวอักษร`);
    }else{
        showSuccess(input);
    }
}

// ตรวจสอบ Password
function passwordCheckLength(pass1,min,max){
    //เนื่องจาก ถ้าส่ง pass1 = passwordEL ไปตรงๆ จะทำให้ไปเรียก parent ที่เป็น div.password-box
    
     //ต้องแปลงก่อนเพื่อถอยหลัง parentelement  1ขั้น
    if(pass1.value.length<min){
        showError(pass1,`Password ต้องมีไม่น้อยกว่า ${min} ตัวอักษร`);
    }else if(pass1.value.length>max){
        showError(pass1,`Password ต้องมีไม่เกิน ${max} ตัวอักษร`);
    }else{
        checkPasswordMix(pass1);
        // showSuccess(pass1_toParent);
    }
}
// ดักจับช่อง ยืนยันรหัสผ่าน (Confirm Password)
function passwordCheckMatch(pass1,pass2){

    if(pass1.value != pass2.value){
        showError(pass2,`รหัสผ่านไม่ตรงกัน`); //อ้างอิงไปที่ passwordEL_confirm
    }else if(pass2.value ==''){
        showError(pass2,`กรุณากรอกรหัสให้ครบถ้วน`);
    }else{
        showSuccess(pass2);
    }
}

function checkPasswordMix(input) {
    // 1. สูตรเช็คตัวอักษรภาษาอังกฤษ (a-z หรือ A-Z)
    const hasLetter = /[a-zA-Z]/;
    //หมายถึง ขอให้มีตัว A-Z (ตัวใหญ่) หรือ a-z (ตัวเล็ก) สักตัวหนึ่ง
    
    // 2. สูตรเช็คตัวเลข (0-9)
    const hasNumber = /[0-9]/;

    // ดึงค่าที่ User พิมพ์
    const value = input.value;

    // เช็คเงื่อนไข: ถ้า "ไม่มีตัวอักษร" หรือ "ไม่มีตัวเลข" อย่างใดอย่างหนึ่ง
    //.test(value): เป็นคำสั่งให้ JS ตรวจสอบว่าข้อความตรงตามสูตรไหม (ได้ค่า true/false)
    if (!hasLetter.test(value) || !hasNumber.test(value)) {
        showError(input, 'รหัสผ่านต้องมีทั้งตัวอักษรและตัวเลขผสมกัน');
    } else {
        showSuccess(input);
    }
}
//การเช็ครูปแบบอีเมลต้องใช้ "สูตรคณิตศาสตร์ภาษาต่างดาว" ที่เรียกว่า Regex ครับ (ก๊อปไปใช้ได้เลย เป็นมาตรฐานโลก)
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'รูปแบบอีเมลไม่ถูกต้อง');
    }
}