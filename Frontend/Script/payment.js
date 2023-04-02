





let total = JSON.parse(localStorage.getItem("cost"))
//console.log(total)

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


let prepaid = document.getElementById("prepaid_total_amount")
prepaid.innerHTML=`Total :- ${total}`

let cod = document.getElementById("cash_total_amount")
cod.innerHTML = `Total :- ${total}`


////stripe part

var stripe = Stripe("pk_test_51MreRESAewYLUjTaDaclpjqFiPr8PiYEobV7WLt493XWu4MBAGoSgrmOnQyGyaj7TYNlzd5jQH3CASl7IA1V9P2400qjg1TM6p");
var checkoutButton = document.getElementById("btn");

checkoutButton.addEventListener("click", function () {
  fetch("http://localhost:8080/payment", {
    headers: {'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify({
        "product": {
            "name": "iPhone 12", 
            "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000", 
            "amount": 100,
            "quantity": 1
        }})
  })
    .then(function (response) {
      // console.log(response.json());
      // localStorage.setItem("result",JSON.stringify(response.json()));
      return response.json();

    })
    .then(function (session) {
      console.log("session")
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      localStorage.setItem("result",JSON.stringify(result));
      console.log("resul")
      if (result.error) {
        alert(result.error.message);
      }
      
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});


