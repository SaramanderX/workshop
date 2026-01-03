const contents = document.querySelectorAll('.content');

document.addEventListener('scroll',ShowText);

function ShowText(){
    //loop  โดยการดึงทีละอัน
    contents.forEach((section)=>{
        const imgEL = section.querySelector('img');
        const textEL = section.querySelector('.text');

        //ดึงแหน่ง scroll
        const scrollPos = window.pageYOffset;
        // 500+100 / 50
        // 502 => แสดงข้อความ 
        //ตำแหน่งสูงสุดของภาพ + ความสูงของภาพ
        const textPosition = imgEL.offsetTop + imgEL.offsetHeight / 50;
        if(scrollPos > textPosition){
            //แสดงเนื้อหา
            textEL.classList.add('show-reveal');
        }else{
            //ปิดการแสดงเนื้อหา
            textEL.classList.remove('show-reveal');
        }
    });
}