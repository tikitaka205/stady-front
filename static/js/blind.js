window.onload = function(){
    post_list()
}

post_list = () =>{
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/blind`,
        data: {},
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        success: function (response) {
            console.log(response)
            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    let id = response[i]['id']
                    console.log(id)
                    let title = response[i]['title']
                    let hits =response[i]['hits']
                    let created_at = response[i]['created_date']
                    let category = response[i]['category']
                    let user = response[i]['user']

                    temp_html=` <tr>
                    <td>${id}</td>
                    <td>
                    <div onclick="postid(${id})"> ${title} </div>
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


function postid(post_id) {
    console.log("post_id", post_id)
    post_id=localStorage.setItem('post_id',post_id)
    location.href='post_detail.html'
    }

    