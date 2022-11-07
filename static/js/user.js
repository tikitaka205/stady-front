

async function handleSignin(){
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(email.value)

    const response = await fetch('http://127.0.0.1:8000/user/', {
        headers : {
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "email" : email,
            "username" : username,
            "password" : password
        })
    })

    if (response.status == 201){
        window.location.href = "/user/login.html"
    }
}

async function handleLogin(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value


    const response = await fetch('http://127.0.0.1:8000/user/api/token/', {
        headers : {
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "email" : email,
            "password" : password
        })
    })
    if(response.status === 200){
        const response_json = await response.json()

        console.log(response_json["access"])

        localStorage.setItem('access', response_json.access)
        localStorage.setItem('refresh', response_json.refresh)


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem('payload', jsonPayload)

        window.location.href = "/index.html"

    }else{
        alert('비밀번호 혹은 아이디를 확인해 주세요')
    }

    

}




