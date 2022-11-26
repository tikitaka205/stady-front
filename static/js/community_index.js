window.onload = function(){
    post_list()
}

post_list = () =>{
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/community/`,
        data: {},
        headers: {
        },
        success: function (response) {
            console.log(response)
            // console.log(response['results'][0]['title'])
            $('#post_list').empty()
            
            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    let id = response[i]['id']
                    let title = response[i]['title']
                    let hits =response[i]['hits']
                    let created_at = response[i]['created_date']
                    let category = response[i]['category']
                    let user = response[i]['user']
                    let comments_count=response[i]['comments_count']

                    temp_html=` <tr>
                    <td>${id}</td>
                    <td>
                    <div style = "cursor : pointer;" onclick="postid(${id})"> ${title} [${comments_count}] </div>
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


// post_id localstorage
function postid(post_id) {
    console.log("post_id", post_id)
    localStorage.setItem('community_post_id',post_id)
    location.href='post_detail.html'
    }


function category_list(category_name) {
    let category = category_name;
    console.log("리스트 함수안",category)
    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/community/category/?category=${category}`,
        data: {},

        headers: {
        },

        success: function (response) {
        $('#post_list').empty()
        console.log("여기가",response['results'][0]['title'])
        console.log('성공:', response);
        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                let id = response['results'][i]['id']
                console.log(id)
                let title = response['results'][i]['title']
                let hits =response['results'][i]['hits']
                let created_at = response['results'][i]['created_date']
                let category = response['results'][i]['category']
                let user = response['results'][i]['user']
                let comments_count=response['results'][i]['comments_count']


                temp_html=` <tr>
                <td>${id}</td>
                <td>
                <div style = "cursor : pointer;" onclick="postid(${id})"> ${title} [${comments_count}] </div>
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

        });
}
