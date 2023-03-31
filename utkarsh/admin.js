document.querySelector(".users").addEventListener("click",() => {
    getUsers();
})

document.querySelector(".doctors").addEventListener("click",() => {
    getUsers();
})

var baseURL = 'https://tooth-tracker.cyclic.app'

async function getUsers(){
    let users = await fetch(`${baseURL}/admin/users`,{
        method:'GET',
        headers:{
            'content-type':'application/json',
            'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJhZG1pbjEiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyRxY2lQS3FWZFFRRFd4Lno0VGlKb2hlejc5eXpVZ3hYejRnV0tCU3VJVHo1Y3lvVDNlS292cSIsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDAzLTA4LTEyVDAwOjAwOjAwLjAwMFoiLCJHaXRodWIiOm51bGwsImlhdCI6MTY4MDI4NDE4OH0.t6IyQ9lqngiaaHXSZivHpNRtGkgwQqzDq8lijjnS58c'
        }
    })
    users = await users.json();
    console.log(users);
}