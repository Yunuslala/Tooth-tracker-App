


let id=JSON.parse(localStorage.getItem("doctid"))
let cat =JSON.parse(localStorage.getItem("categ"))

let url="https://tooth-tracker.cyclic.app"
slotsdata()
async function slotsdata(){
    try {
        let res=await fetch(`${url}/slots`);
        if(res.ok){
            let result=await res.json();
            displaySlot(result)
            
    } 
}catch (error) {
        console.log(error);
    }
   
    
}
function displaySlot(result){
    //console.log(result)
    result.map((item)=>{
        console.log(item);
        let btn = document.createElement("button")
        let h1 = document.createElement("h1")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let p4 = document.createElement("p")

        h1.innerHTML = item.sub_category
        p1.innerHTML = `${item.duration}  min`

        let date = new Date(`${item.start}`)

        p2.innerHTML = `Date-${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        p3.innerHTML = `Start-${date.getHours()}:${date.getMinutes()}`
        p4.innerHTML = `Duration(min) - ${item.duration}`
        btn.append(h1,p1,p2,p3,p4)

        let time=  document.getElementById("time")
       //console.log(doc);
         time.append(btn)

         btn.addEventListener("click",(event)=>{

            localStorage.setItem("slotid",JSON.stringify(item.id))

            window.location.href = "./payment.html"
         })
    })
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