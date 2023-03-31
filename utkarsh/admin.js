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