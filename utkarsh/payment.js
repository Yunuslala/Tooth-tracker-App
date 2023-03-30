







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


let card_button = document.getElementById("Pbtn")
card_button.onclick = ()=>{
    let card_number = document.getElementById("card_number").value
    let card_name = document.getElementById("card_name").value
    let card_month = document.getElementById("card_month").value
    let card_year = document.getElementById("card_year").value
    let card_cvv = document.getElementById("card_cvv").value
    
    if(card_number==""||card_name==""||card_month==""||card_year==""||card_cvv==""){
        alert("please fill all details")
    }
    else if(card_number.length<16){
        alert("Please fill complete Card Number")
    }
    else if(card_cvv.length<3 || card_cvv.length>3){
        alert("Please fill correct cvv")
    }
    else{
        
        alert("Hurray! Your booking is confirmed")
       // window.location.href = "./index.html"
    }
    
}




