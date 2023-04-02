document.querySelector(".users").addEventListener("click", () => {

    getUsers();
})


const token = JSON.parse(localStorage.getItem("token"))
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
    div.innerHTML = ""
    div.style.display = "block"
    let div4 = document.getElementById("meeting")
    div4.style.display = "none"
    let div2 = document.getElementById("doctor")
    div2.style.display = "none"
    let div3 = document.getElementById("slot")
    div3.style.display = "none"
    div.style.display = "grid"
    div.style.gridTemplateColumns = "repeat(4,1fr)"
    div.style.color = "black"
    div.style.textAlign = "center"
    
    div.style.gap = "20px"
    div.style.margin="20px"

    users.map((item) => {
        let d = document.createElement("div")

        let img = document.createElement("img")
        img.src = "./user.jpg"
        let h1 = document.createElement("h1")
        h1.innerHTML = item.name

        d.append(img, h1)
        d.style.border = "1px solid orange"
        d.style.borderRadius = "20%"

        div.append(d)



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
    div2.style.display = "block"
    let div4 = document.getElementById("meeting")
    div4.style.display = "none"

    let div3 = document.getElementById("slot")
    div3.style.display = "none"
    let d = document.getElementById("d1")
    d.innerHTML = ""



    doctors.map((item) => {

        let div = document.createElement("div")

        let img = document.createElement("img")
        img.src = "./doctor.jpg"
        let h1 = document.createElement("h1")
        h1.innerHTML = item.name

        div.append(img, h1)

        d.append(div)


    })
}

document.querySelector(".slots").addEventListener("click", () => {
    getSlots();
})

async function getSlots() {
    let slots = await fetch(`${baseURL}/admin/allSlots`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
        }

    })
    slot = await slots.json();
    //console.log(slot);
    let div1 = document.getElementById("user")
    div1.style.display = "none"
    let div2 = document.getElementById("doctor")
    div2.style.display = "none"
    let div3 = document.getElementById("slot")
    div3.style.display = "block"
    let div4 = document.getElementById("meeting")
    div4.style.display = "none"
    let d = document.getElementById("s")

    d.innerHTML = ""


    slot.map((item) => {
        let div = document.createElement("div")

        let x = item.isbooked
        let y = "";
        if (x == 1) {
            y = "Booked"
        } else {
            y = "Empty"
        }


        let h3 = document.createElement("h3")
        h3.innerHTML = `category:-${item.category}`
        let p1 = document.createElement("p")
        p1.innerHTML = `sub-category:-${item.sub_category}`
        let p2 = document.createElement("p")
        p2.innerHTML = `Meeting-ID:-${item.meetingId}`
        let p3 = document.createElement("p")
        p3.innerHTML = `Start-Time:-${item.start}`
        let p4 = document.createElement("p")
        p4.innerHTML = `Status:-${y}`


        div.append(h3, p1, p2, p3, p4)

        d.append(div)


    })
}


let form1 = document.getElementById("f1")

let s1 = document.getElementById("s1")

s1.onclick = (event) => {
    event.preventDefault()

    let obj = {
        name: form1.dname.value,
        speciality: form1.spec.value,
        sub_speciality: form1.sub.value,
        degree: form1.deg.value
    }
    postDoctors(obj)

    //console.log(obj)

}


async function postDoctors(obj) {

    let data = await fetch(`${baseURL}/admin/addDoctor`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
        },
        body: JSON.stringify(obj)

    })

    //console.log(obj)

}



let form2 = document.getElementById("f2")

let s2 = document.getElementById("s2")

s2.onclick = (event) => {
    event.preventDefault()

    let obj = {
        category: form2.cat.value,
        sub_category: form2.scat.value,
        date: form2.date.value,
        start: form2.st.value,
        duration: form2.dur.value
    }
    postDoctors(obj)

    //console.log(obj)

}


async function postDoctors(obj) {

    let data = await fetch(`${baseURL}/admin/addSlot`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
        },
        body: JSON.stringify(obj)

    })

    //console.log(obj)

}

///Meetings-Section



document.querySelector(".Meets").addEventListener("click", () => {
    meeting()
})


async function meeting() {
    try {
        const res = await fetch(`${baseURL}/admin/allMeetings`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
            }
        })

        if (res.ok) {
            let ans = await res.json();
            let div1 = document.getElementById("user")
            div1.style.display = "none"
            let div2 = document.getElementById("doctor")
            div2.style.display = "none"
            let div3 = document.getElementById("slot")
            div3.style.display = "none"
            let div4 = document.getElementById("meeting")
            div4.innerHTML = ""
            div4.style.display = "block"


            div4.style.display = "grid"
    div4.style.gridTemplateColumns = "repeat(4,1fr)"
    div4.style.color = "black"
    div4.style.textAlign = "center"
    div4.style.marginTop = "20px"
    div4.style.gap = "20px"

            ans.map((item) => {

                let div = document.createElement("div")
                let h3 = document.createElement("h3")
                h3.innerHTML = `category:-${item.category}`
                let p1 = document.createElement("p")
                p1.innerHTML = `User-ID:-${item.userId}`
                let p2 = document.createElement("p")
                p2.innerHTML = `Doctor-ID:-${item.doctorId}`
                let p3 = document.createElement("p")
                p3.innerHTML = `Slot-Id:-${item.slotId}`

                div.append(h3,p1,p2,p3)

                div4.append(div)
            })

        }
    } catch (error) {
        console.log(error);
    }


}

// function DisplayMeet(ans) {
//     //console.log("123");
//     let divs = ans.map((item) => {
//         ///these data should present on ui
//         let h3 = document.createElement("h3")
//         h3.innerHTML = `category:-${item.category}`
//         let p1 = document.createElement("p")
//         p1.innerHTML = `User-ID:-${item.userId}`
//         let p2 = document.createElement("p")
//         p2.innerHTML = `Doctor-ID:-${item.docterId}`
//         let p3 = document.createElement("p")
//         p3.innerHTML = `Slot-Id:-${item.slotId}`
//     }).join(" ");
//     console.log(divs)
// }