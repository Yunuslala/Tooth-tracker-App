let register = document.querySelector("form");
register.addEventListener("submit", myfun);

async function myfun(event) {
  event.preventDefault();
  console.log("heloo");
  let userObj = {
    name: register.name.value,
    email: register.email.value,
    date_of_birth:register.date_of_birth.value,
    phone:register.phone.value,
    password: register.password.value,
  };
//   if(name==""|| email==""|| age=="" ||phone==""|| password==""){
//     alert("Please fill all the credential")
//   }
  let data = await userRegister(userObj);
  console.log(data);
 
 
//   location.replace("login.html");
console.log(userObj)
}
async function userRegister(userObj) {
  console.log(userObj);
  try {
    let data = await fetch("https://tooth-tracker.cyclic.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    return await data.json();
  } catch (err) {
    console.log(err);
  }
}
