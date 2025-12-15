const switchToggle= document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav= document.getElementById('nav');

// เข้าถึงภาพ
const Image1 = document.getElementById('image-1');
const Image2 = document.getElementById('image-2');
const Image3 = document.getElementById('image-3');


function switchMode(e){
    if(e.target.checked){
        // ก่อนจะเข้า darkmode
        document.documentElement.setAttribute('data-theme','dark')
        DarkMode();
        imageSwitchMode('dark'); //โหมดโดยการเรียก function
    }else{
        document.documentElement.setAttribute('data-theme','light')
        LightMode();
        imageSwitchMode('light');
    }

}
function DarkMode(){
    // เข้าไปที่ตัวแม่ toggle ไปที่ลูก 
    toggleIcon.children[0].textContent="โหมดกลางคืน";
    toggleIcon.children[1].classList.replace('fa-sun','fa-moon');
    nav.style.backgroundColor='rgb(0 0 0 /50%)';
}
function LightMode(){
    toggleIcon.children[0].textContent="โหมดกลางวัน";
    toggleIcon.children[1].classList.replace('fa-moon','fa-sun');
    nav.style.backgroundColor='rgb(255 255 255 /50%)'
}

// image change
function imageSwitchMode(mode){
    Image1.src=`img/projection_${mode}.svg`
    Image2.src=`img/learning_${mode}.svg`
    Image3.src=`img/freelancer_${mode}.svg`
}


switchToggle.addEventListener('change',switchMode);