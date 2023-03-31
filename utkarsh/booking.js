
function slot(e){
    let cat=e;
window.location.href="./booking1.html"
localStorage.setItem("categ",JSON.stringify(e));
console.log(e);
}
document.getElementById("condition").addEventListener("click",(e)=>{
    slot(e.target.value)
})





// let b1 = document.getElementById("b1")

// b1.addEventListener("click",myFunc1)

// function myFunc1(){
    
//     localStorage.setItem("condition","New Patient Cleaning & Exam (14 & under)")
//     window.location.href="./booking1.html"

// }

// let b2 = document.getElementById("b2")

// b2.addEventListener("click",myFunc2)

// function myFunc2(){
   
//     localStorage.setItem("condition","New Patient Emergency/Tooth Pain")
//     window.location.href="./booking1.html"
// }

// let b3 = document.getElementById("b3")

// b3.addEventListener("click",myFunc3)

// function myFunc3(){
  
//     localStorage.setItem("condition","New Patient Cleaning & Exam - Adult")
//     window.location.href="./booking1.html"
// }


// let b4 = document.getElementById("b4")

// b4.addEventListener("click",myFunc4)

// function myFunc4(){
    
//     localStorage.setItem("condition","Dental Implant Consult")
//     window.location.href="./booking1.html"
// }




