document.querySelector(".users").addEventListener("click", () => {

    getUsers();
})



var baseURL = 'https://tooth-tracker.cyclic.app'

async function getUsers() {
    let users = await fetch(`${baseURL}/admin/users`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
        }
    })
    users = await users.json();
    //console.log(users);
    let div = document.getElementById("user")
    div.style.display = "block"

    users.map((item) => {

        let img = document.createElement("img")
        img.src = "./user.jpg"
        let h1 = document.createElement("h1")
        h1.innerHTML = item.name

        div.append(img, h1)


    })
}


document.querySelector(".doctors").addEventListener("click", () => {
    getDoctors();
})


async function getDoctors() {
    let doctor = await fetch(`${baseURL}/doctors`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
        }
    })
    doctors = await doctor.json();
    console.log(doctors);
    let div1 = document.getElementById("user")
    div1.style.display = "none"
    let div2 = document.getElementById("doctor")
    div2.style.display="block"

    doctors.map((item)=>{

        let img = document.createElement("img")
        img.src="./doctor.jpg"
        let h1=document.createElement("h1")
        h1.innerHTML = item.name

        div2.append(img,h1)


    })
}

document.querySelector(".slots").addEventListener("click", () => {
    getSlots();
})

async function getSlots() {
    let slots = await fetch(`${baseURL}/admin/query`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
        },
        body:{"query":"select * from slots"}

    })
    slot = await slots.json();
    console.log(slot);
    // let div = document.getElementById("user")
    // div.style.display = "block"

    // users.map((item) => {

    //     let img = document.createElement("img")
    //     img.src = "./user.jpg"
    //     let h1 = document.createElement("h1")
    //     h1.innerHTML = item.name

    //     div.append(img, h1)


    // })
}


let form1 = document.getElementById("f1")

let s1 = document.getElementById("s1")

s1.onclick = (event)=>{
event.preventDefault()

let obj ={
    name:form1.dname.value,
    speciality:form1.spec.value,
    sub_speciality:form1.sub.value,
    degree:form1.deg.value
}
postDoctors(obj)

//console.log(obj)

}


async function postDoctors(obj){

    let data = await fetch(`${baseURL}/admin/addDoctor`,{
        method:"POST",
        headers: {
            'content-type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
        },
        body:JSON.stringify(obj)

    })

    console.log(obj)

}

