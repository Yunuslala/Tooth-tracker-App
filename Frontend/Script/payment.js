





let total = JSON.parse(localStorage.getItem("cost"));
total=total*500;
let cat=JSON.parse(localStorage.getItem("categ"));
//console.log(total)
let slotId=localStorage.getItem("slotid");
let userId=localStorage.getItem("doctid")
const payobj=
{
  userId: 1,
  slotId,
  amount: total,
  method: "card"
}

let select = document.getElementById("change")

select.onchange =()=>{
    handlePayment()
}


function handlePayment(){
    let selected = document.getElementById("change").value
    
    
    let prepaid = document.getElementById("Prepaid")
    let COD = document.getElementById("COD")

    if(selected=="COD"){
        
        COD.style.display="block"
        prepaid.style.display="none"


    }else if(selected=="Prepaid"){
        
        prepaid.style.display="block"
        COD.style.display="none"
    }
}








let cash_button = document.getElementById("cbtn")
cash_button.onclick = ()=>{
    
   
    alert("Hurray! Your booking is confirmed")
    //window.location.href = "./index.html"
}


// let card_button = document.getElementById("Pbtn")
// card_button.onclick = ()=>{
//     let card_number = document.getElementById("card_number").value
//     let card_name = document.getElementById("card_name").value
//     let card_month = document.getElementById("card_month").value
//     let card_year = document.getElementById("card_year").value
//     let card_cvv = document.getElementById("card_cvv").value
    
//     if(card_number==""||card_name==""||card_month==""||card_year==""||card_cvv==""){
//         alert("please fill all details")
//     }
//     else if(card_number.length<16){
//         alert("Please fill complete Card Number")
//     }
//     else if(card_cvv.length<3 || card_cvv.length>3){
//         alert("Please fill correct cvv")
//     }
//     else{
        
//         alert("Hurray! Your booking is confirmed")
//        // window.location.href = "./index.html"
//     }
    
// }


// let prepaid = document.getElementById("prepaid_total_amount")
// prepaid.innerHTML=`Total :- ${total}`

// let cod = document.getElementById("cash_total_amount")
// cod.innerHTML = `Total :- ${total}`


////stripe part

// let token=JSON.stringify(localStorage.getItem("token"));
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsIm5hbWUiOiJzYWlmIiwicGhvbmUiOiI5MTcwOTU3NDkxIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA3JGFvN2dQNkxOQVpFTGVpRTM1US5oQnU0VnFkR0lTQUlnbU5UNnVqa01aVXRPU2MyNHF4aG91Iiwicm9sZSI6InVzZXIiLCJkYXRlX29mX2JpcnRoIjoiMjAwMy0wMi0yMlQwMDowMDowMC4wMDBaIiwiR2l0aHViIjpudWxsLCJpYXQiOjE2ODA0MzUxMjN9.rBCyoU5j3lp_y8WDenRlfIVgECqw3aO8DjcH3rtX6zg
// console.log(token)

var stripe = Stripe("pk_test_51MreRESAewYLUjTaDaclpjqFiPr8PiYEobV7WLt493XWu4MBAGoSgrmOnQyGyaj7TYNlzd5jQH3CASl7IA1V9P2400qjg1TM6p");
var checkoutButton = document.getElementById("btn");

checkoutButton.addEventListener("click", async function () {
 const resul= await fetch("https://tooth-tracker.cyclic.app/payment", {
    headers: {'Content-Type': 'application/json',
    "authorization":localStorage.getItem("token")
  },
    method: "POST",
    body: JSON.stringify({amount:total ,
        quantity:1,
        name:cat })
  });
 let ans= await resul.json();
 console.log(ans);
 if(ans){
  paymentsavedb(payobj);
  let striperes=stripe.redirectToCheckout({ sessionId: ans.id })
 striperes.then((res)=>{
  console.log(res)

 }).catch((err)=>{
console.log("err",err)
 })
 }
});



async function paymentsavedb(payobj){
  try {
    let respo=await fetch("https://tooth-tracker.cyclic.app/pay",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
    "authorization":localStorage.getItem("token")
      },
      body:JSON.stringify(payobj)
    });
    console.log(await respo.json());
    if(respo.ok){
      let result=await respo.json();
      localStorage.setItem("paymentstaus","payment stored")
      console.log(result)
    }
  } catch (error) {
    console.log(error);
  }
}
