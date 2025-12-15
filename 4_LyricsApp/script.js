const form=document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more=document.getElementById('more');

const apiURL="https://api.lyrics.ovh/v1";

// เมื่อมีการกดปุ่ม submit
form.addEventListener('submit',e=>{
    e.preventDefault(); //จะไม่มีการกระพริบหน้าจอ
    const songtxt =search.value.trim(); //trim ลบช่องว่างซ้ายขวา
    if(!songtxt){
        alert("ป้อนข้อมูลไม่ถูกต้อง");
    }else{
        // ดึงรายชื่อเพลง ใช้ function
        searchLyrics(songtxt);
    }
})
// รอดึงข้อมูลรายชื่อเพลง
async function searchLyrics(songtxt){
    const res = await fetch(`${apiURL}/suggest/${songtxt}`); 
    const allsong =await res.json();
    showData(allsong); //ได้เป็นก้อน oject จากนั้นเข้าถึงข้อมูล ทีละอันด้วย map ?
}
function showData(song){
    result.innerHTML=`
        <ul class="songs">
            ${song.data.map(song=>
                `
                <li>
                <span>
                    <strong>${song.artist.name}</strong> 
                </span>
                </li>
                `
            ).join("")}
        
        </ul>
    `;
}
// เนื่องจากapiใช้ไม่ได้ ยุติการเขียน