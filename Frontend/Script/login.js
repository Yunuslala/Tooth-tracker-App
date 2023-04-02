document.querySelector('#login').addEventListener('submit',async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const payload = {
        email,
        password
    }

    try {
        let res = await fetch('https://tooth-tracker.cyclic.app/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(payload)
        })
        res = await res.json();
        console.log(res);
        alert(res.msg);
        if(res.role=="user"){
            localStorage.setItem("token",res.token);
            window.location.href="../index.html"
        }
        if(res.role=="admin"){
            localStorage.setItem("token",res.token);
            window.location.href="../Admin/admin.html"
        }
       
    }
    catch (error) {
        console.log(error);
    }
});


function home(){
    window.location.href="../index.html"
  }