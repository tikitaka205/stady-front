window.onload = function(){
    post_list()
    $("time.timeago").timeago();

}

post_list = () =>{
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/community/`,
        data: {},
        headers: {
        },
        success: function (response) {
            console.log("시간",response['results'][1]["created_date"])
            console.log(response)
            console.log(response['results'][0]['title'])
            $('#post_list').empty()
            
            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {
                    var time = response['results'][i]["created_date"] + "Z"
                    console.log("time",time)

                    let id = response['results'][i]['id']
                    let title = response['results'][i]['title']
                    let hits =response['results'][i]['hits']
                    // let created_at = response['results'][i]['created_date']
                    let category = response['results'][i]['category']
                    let user = response['results'][i]['user']
                    let comments_count=response['results'][i]['comments_count']
                    let next=response['next']
                    let previous=response['previous']

                    temp_html=` <tr>
                    <td>${id}</td>
                    <td>
                    <div style = "cursor : pointer;" onclick="postid(${id})"> ${title} [${comments_count}] </div>
                    </td>
                    <td>${category}</td>
                    <td>${hits}</td>
                    <td>${user}</td>
                    <td><time class="timeago" datetime="${time}">
                    </td>
                    

                </tr>`
                $('#post_list').append(temp_html)
                $('#next').attr('onclick', `page("${next}")`)
                $('#previous').attr('onclick', `page("${previous}")`)
                $("time.timeago").timeago();

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
        console.log("여기가",response['results'].length)
        console.log("여기가",response['next'])
        console.log('성공:', response);
        if (response['results'].length > 0) {
            for (let i = 0; i < response['results'].length; i++) {
                let id = response['results'][i]['id']
                console.log(id)
                let title = response['results'][i]['title']
                let hits =response['results'][i]['hits']
                // let created_at = response['results'][i]['created_date']
                var time = response['results'][i]["created_date"] + "Z"
                let category = response['results'][i]['category']
                let user = response['results'][i]['user']
                let comments_count=response['results'][i]['comments_count']
                let next=response['next']
                let previous=response['previous']

                temp_html=` <tr>
                <td>${id}</td>
                <td>
                <div style = "cursor : pointer;" onclick="postid(${id})"> ${title} [${comments_count}] </div>
                </td>
                <td>${category}</td>
                <td>${hits}</td>
                <td>${user}</td>
                <td><time class="timeago" datetime="${time}">  
                </td>
                </tr>`
            $('#post_list').append(temp_html)
            $('#next').attr('onclick', `page("${next}")`)
            $('#previous').attr('onclick', `page("${previous}")`)
            $("time.timeago").timeago();

        }
        }
        }
        });
}

// 페이지네이션 함수
function page(page) {
    console.log("첫 콘솔",page);

    $.ajax({

        type: "GET",
        url: page,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
        $('#post_list').empty()
        console.log("여기가",response['results'][0]['title'])
        console.log("여기가",response['results'].length)
        console.log("여기가",response['next'])
        console.log('성공:', response);
        if (response['results'].length > 0) {
            for (let i = 0; i < response['results'].length; i++) {
                let id = response['results'][i]['id']
                console.log(id)
                let title = response['results'][i]['title']
                let hits =response['results'][i]['hits']
                // let created_at = response['results'][i]['created_date']
                var time = response['results'][i]["created_date"] + "Z"
                let category = response['results'][i]['category']
                let user = response['results'][i]['user']
                let comments_count=response['results'][i]['comments_count']
                let next=response['next']
                let previous=response['previous']


                temp_html=` <tr>
                <td>${id}</td>
                <td>
                <div style = "cursor : pointer;" onclick="postid(${id})"> ${title} [${comments_count}] </div>
                </td>
                <td>${category}</td>
                <td>${hits}</td>
                <td>${user}</td>
                <td><time class="timeago" datetime="${time}">  
                </td>
            </tr>`
            $('#post_list').append(temp_html)
            $('#next').attr('onclick', `page("${next}")`)
            $('#previous').attr('onclick', `page("${previous}")`)
            $("time.timeago").timeago();
        }
        }
        }
        });
}