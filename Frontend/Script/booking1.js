let condition=document.getElementById("condition")
let cond = localStorage.getItem("categ")
condition.innerHTML=cond
// let d1 = document.getElementById("d1")

// d1.addEventListener("click",myFunc1)

// function myFunc1(){
//     d1.style.backgroundColor="#007bff"
//     d1.style.color="white"
//     window.location.href="./booking2.html"
// }
// let d2 = document.getElementById("d2")
// d2.addEventListener("click",myFunc2)
// function myFunc2(){
//     d2.style.backgroundColor="#007bff"
//     d2.style.color="white"
//     window.location.href="./booking2.html"
// }
let backbtn = document.getElementById("back")
backbtn.addEventListener("click",backFunc)
function backFunc(){
    window.location.href="booking.html"
}

const token=JSON.parse(localStorage.getItem("token"))
const url="http://tooth-tracker.cyclic.app/"
fetchDoc()
async function fetchDoc(){
    try {
        let res=await fetch(`${url}/doctors`,{
            // Method:"GET",
            // headers:{
            //     "Content-Type":"application/json",
            //     "authorization":token
            // }
        });
        // let vari = await res.json()
        // console.log(vari)
        if(res.ok){
            let ans=await res.json();
            console.log(ans);
            displDoc(ans)
                }
    } catch (error) {
        console.log(error);
    }
}

function displDoc(ans){
    console.log(ans);
       ans.map((item)=>{
        console.log(item);
       let btn= document.createElement("button")
       let h1=document.createElement("h3");
       let p=document.createElement("p");
       h1.innerHTML=item.name;
       p.innerHTML=item.degree;
       btn.append(h1,p)
       btn.addEventListener("click",(e)=>{
        localStorage.setItem("doctid",JSON.stringify(item.id))
        // docid(item.id)
        window.location.href="./booking2.html"
       })
       let doc=  document.getElementById("doctors")
       console.log(doc);
         doc.append(btn)
    })
}


