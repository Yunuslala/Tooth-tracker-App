


let docid=JSON.parse(localStorage.getItem("doctid"))
let cat =JSON.parse(localStorage.getItem("categ"))

let url="https://tooth-tracker.cyclic.app"
slotsdata()
async function slotsdata(){
    try {
        let res=await fetch(`${url}/slots`);
        if(res.ok){
            let result=await res.json();
            //console.log(result);
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
        
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let p4 = document.createElement("p")

        h1.innerHTML = item.sub_category
        

        let date = new Date(`${item.start}`)

        p2.innerHTML = `Date-${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        p3.innerHTML = `Start-${date.getHours()}:${date.getMinutes()}`
        p4.innerHTML = `Duration(min) - ${item.duration}`
        btn.append(h1,p2,p3,p4)

        let time=  document.getElementById("time")
       //console.log(doc);
         time.append(btn)

         btn.addEventListener("click",(event)=>{
            console.log(item);

            localStorage.setItem("slotid",JSON.stringify(item.id))

            let {category,sub_category,id} = item

            let obj={
                category,
                sub_category,
                "slotId":id,
                "doctorId":docid


            }
            console.log(obj)

            // window.location.href = "./payment.html"
           slotfetch(obj);
         })
    })
}




let condition=document.getElementById("condition")
let cond = localStorage.getItem("condition")
condition.innerHTML=cat
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


// document.getElementById("slottime").addEventListener("change",(e)=>{
//     console.log(e.target.value);
//     slotfetch(e.target.value)
// })







async function  slotfetch(obj){
   try {
    let res = await fetch(`${url}/newMeeting`,{
        method: 'POST',
        headers: {
            'content-type':'application/json',
            'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE2ODAyNzI2MDR9.JZS6Zx-uqJzMPbkcD_CMzSsBoMK8KKMFdG95fx8EvN8'
        },
        body: JSON.stringify(obj)
    })
    console.log(res);
    if(res.status == 200){
        res = await res.json();
        console.log(res);
        const cost = getCost(`${url}/getCost/${obj.slotId}`);
        console.log(cost);
        alert(res.msg)
        window.location.href = "./payment.html"
    }
    else{
        console.log(res)
        alert(res.msg);
        
    }
   }
   catch (error) {
    console.log(error);
   }
}

async function getCost(url){
    try {
        let cost = await fetch(url,{
            method:'GET',
            headers:{
                authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE2ODAyNzI2MDR9.JZS6Zx-uqJzMPbkcD_CMzSsBoMK8KKMFdG95fx8EvN8'
            }
        })

        cost = await cost.json();
        //console.log(cost);
        localStorage.setItem('cost',JSON.stringify(cost.cost));
        return cost;
    }
    catch (error) {
        console.log(error);
    }
}