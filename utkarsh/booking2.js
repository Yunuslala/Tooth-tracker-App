


let id=JSON.parse(localStorage.getItem("doctid"))
let cat =JSON.parse(localStorage.getItem("categ"))

let url="https://tooth-tracker.cyclic.app"
slotsdata()
async function slotsdata(){
    try {
        let res=await fetch(`${url}/slots`);
        if(res.ok){
            let result=await res.json();
            let data=new Date(`${result[0].start}`)
            console.log(data.getHours());
            console.log(data.getMinutes());

            console.log(result[0]);
    } 
}catch (error) {
        console.log(error);
    }
   
    
}




let condition=document.getElementById("condition")
let cond = localStorage.getItem("condition")
condition.innerHTML=cond
let backbtn = document.getElementById("back")
backbtn.addEventListener("click",backFunc)
function backFunc(){
window.location.href="booking1.html"
}
let nextbtn = document.getElementById("next")
nextbtn.addEventListener("click",nextFunc)
function nextFunc(){
window.location.href="payment.html"
}


document.getElementById("slottime").addEventListener("change",(e)=>{
    console.log(e.target.value);
    slotfetch(e.target.value)
})







async function  slotfetch(val){
    try {
        let res=await fetch(`${url}/newMeeting`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({"category":"cleaning","sub_category":cat,"docId":id,"time":val})
        });
        if(res.ok){
            let result=res.json()
            console.log(result);
        }
    } catch (error) {
        
    }
}