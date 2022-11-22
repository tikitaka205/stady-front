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
                    <div onclick="postid(${id})"> ${title} [${comments_count}] </div>
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
    post_id=localStorage.setItem('post_id',post_id)
    location.href='post_detail.html'
    }


    
// 자유게시판 클릭
$('#free_list').click( function() {
    free_list()
});
function free_list() {
    let category = '자유게시판' ;
    console.log(category)
    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/community/category/?category=${category}`,
        data: {},

        headers: {
        },

        success: function (response) {
        $('#post_list').empty()

        console.log('성공:', response);
        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                let id = response[i]['id']

                console.log(id)
                let title = response[i]['title']
                let hits =response[i]['hits']
                let created_at = response[i]['created_date']
                let category = response[i]['category']
                let user = response[i]['user']
                let comments_count=response[i]['comments_count']


                temp_html=` <tr>
                <td>${id}</td>
                <td>
                <div onclick="postid(${id})"> ${title} [${comments_count}] </div>
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



// 익명게시판 클릭
$('#blind_list').click( function() {
    blind_list()
});
function blind_list() {
    let category = 'blind' ;
    console.log(category)
    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/community/category/?category=${category}`,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
        $('#post_list').empty()

        console.log('성공:', response);
        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                let id = response[i]['id']

                console.log(id)
                let title = response[i]['title']
                let hits =response[i]['hits']
                let created_at = response[i]['created_date']
                let category = response[i]['category']
                let user = response[i]['user']
                let comments_count=response[i]['comments_count']


                temp_html=` <tr>
                <td>${id}</td>
                <td>
                <div onclick="postid(${id})"> ${title} [${comments_count}] </div>
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



// 공부게시판 클릭
$('#study_list').click( function() {
    study_list()
});
function study_list() {
    $('#post_list').empty()

    let category = 'study' ;
    console.log(category)
    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/community/category/?category=${category}`,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
        console.log('성공:', response);
        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                let id = response[i]['id']

                console.log(id)
                let title = response[i]['title']
                let hits =response[i]['hits']
                let created_at = response[i]['created_date']
                let category = response[i]['category']
                let user = response[i]['user']
                let comments_count=response[i]['comments_count']


                temp_html=` <tr>
                <td>${id}</td>
                <td>
                <div onclick="postid(${id})"> ${title} [${comments_count}] </div>
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



// 인기글 클릭
$('#top_list').click( function() {
    top_list()
});
function top_list() {

    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/community/`,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
            console.log(response)
            $('#post_list').empty()

            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    let id = response[i]['id']

                    console.log(id)
                    let title = response[i]['title']
                    let hits =response[i]['hits']
                    let created_at = response[i]['created_date']
                    let category = response[i]['category']
                    let user = response[i]['user']
                    let comments_count=response[i]['comments_count']


                    temp_html=` <tr>
                    <td>${id}</td>
                    <td>
                    <div onclick="postid(${id})"> ${title} [${comments_count}] </div>
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