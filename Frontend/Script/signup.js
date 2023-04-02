document.querySelector("#register").addEventListener("submit",async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const password = document.querySelector("#password").value;
    const date_of_birth = document.querySelector("#date_of_birth").value;

    const payload = {
        name,
        email,
        phone,
        password,
        date_of_birth
    }

    console.log(payload);

    try {
        let res = await fetch('https://tooth-tracker.cyclic.app/register',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(payload)
        });

        res = await res.json();
        console.log(res);
        alert(res.msg);
        if(res.msg=="Registration successful as user"){
            console.log("login success")
            window.location.href="./login.html"
        }
    }
    catch (error) {
        console.log(error);
    }

});

function home(){
    window.location.href="../index.html"
  }