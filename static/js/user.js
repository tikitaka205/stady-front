async function handleSignin() {
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(email)

    const response = await fetch('http://127.0.0.1:8000/user/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password": password
        })
    })

    if (response.ok) {
        alert("회원가입 되었습니다.")
        window.location.href = "/user/login.html"
    } else {
        const response_json = await response.json()
        alert(response_json.message);
        console.warn(`${response.status} 에러가 발생했습니다.`)
    }
}

async function handleLogin() {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value


    const response = await fetch('http://127.0.0.1:8000/user/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    // console.log(response.json())
    if (response.status === 200) {
        const response_json = await response.json()

        console.log(response_json["access"])

        localStorage.setItem('access', response_json.access)
        localStorage.setItem('refresh', response_json.refresh)


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem('payload', jsonPayload)
        localStorage.setItem('stady', JSON.stringify({}));


        window.location.href = "/index.html"

    } else {
        console.log(response)
    }



}

async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.href = "/user/login.html"
}
