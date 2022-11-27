

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
        .then(res => res.json())  //응답 결과를 json으로 파싱
        .then(data => {
            //***여기서 응답 결과로 실행할 동작을 정의하면 됨***
            // [ data.키값 ] 이런 형태로 value 추출 가능 
            alert(data['username']); //응답 결과를 console 창에 출력
        })
        .catch(err => { // 오류 발생시 오류를 담아서 보여줌
            console.log('Fetch Error', err);
        });

    if (response.status == 201) {
        window.location.href = "/user/login.html"
    }
}

async function handleLogin() {
    console.log('핸들')
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
