window.onload = function(){
    post_list()
}

post_list = () =>{
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/blind/category/blind/`,
        data: {},
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        success: function (response) {
            console.log(response)
            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    let id = response[i]['id']
                    let title = response[i]['title']
                    let hits =response[i]['hits']
                    let created_at = response[i]['created_date']
                    let category = response[i]['category']
                    let user = response[i]['user']

                    temp_html=` <tr>
                    <td>${id}</td>
                    <td>
                        <a href="http://127.0.0.1:5500/stady-front/community/post_detail.html?id=${id}">${title}</a>
                    </td>
                    <td>${category}</td>
                    <td>${hits}</td>
                    <td>${user}</td>
                    <td>${created_at}</td>
                </tr>`
                $('#post_list').append(temp_html)
                }
                    
            }
        }
    })
}
