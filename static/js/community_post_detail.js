$(document).ready(function() {
    post_detail()
});
post_id=localStorage.getItem('post_id')
console.log("외부에서 post_id", post_id)

function post_detail() {
        post_id=localStorage.getItem('post_id')

        console.log(post_id)
        $.ajax({
            type: "GET",
            url: `http://127.0.0.1:8000/community/${post_id}/`,
            data: {},
            success: function(response){
            console.log(response)
            let title = response['title']
            let content = response['content']
            let hits = response['hits']
            let user = response['user']
            let likes_count = response['likes_count']
            let comments_count = response['comments_count']

            console.log("포스트 상세")
            console.log(title)
            console.log(hits)

            $('#title').append(title)
            $('#hits').append(hits)
            $('#user').append(user)
            $('#likes_count').append(likes_count)
            $('#likes_count2').append(likes_count)
            $('#content').append(content)
            $('#comments_count').append(comments_count)
            }
            })
    }
$(document).ready(function () {
    comment()
});
    function comment() {
        post_id=localStorage.getItem('post_id')
        console.log("코멘트에서 id 들고오기",post_id)
        $.ajax({
            type: "GET",
            url: `http://127.0.0.1:8000/community/${post_id}/comment`,
            data: {},

            success: function (response) {
                    for (let i = 0; i < response.length; i++) {
                        let content = response[i]['content']
                        let likes_count =response[i]['likes_count']
                        let user = response[i]['user']
                        temp_html=
                        `
                        <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">${user}</div>
                            ${content}
                          </div>
                          <span class="badge bg-primary rounded-pill">${likes_count}</span>
                        </li>
                        `
                    $('#comment_list').append(temp_html)
                    }
            }
            })
        }
            


    $('#comment_submit').click( function() {
        comment_submit()
        });
        function comment_submit() {
            post_id=localStorage.getItem('post_id')
            let content = $("#comment_content2").val()
            let formData = new FormData($('#comment_content')[0]);
            formData.append("content",content);
            console.log("content",content)
            console.log(formData)
        
            $.ajax({
        
                type: "POST",
                url: `http://127.0.0.1:8000/community/${post_id}/comment/`,
                processData: false,
                contentType: false,
                data: formData,
        
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access"),
                },
        
                success: function () {
                    // location.reload()
                }
        
                });
        }


$('#like_submit').click( function() {
    like_submit()
    });
    function like_submit() {
        // post_id=localStorage.getItem('post_id')



        $.ajax({
    
            type: "POST",
            url: `http://127.0.0.1:8000/community/${post_id}/like/`,
            processData: false,
            contentType: false,
            data: {},

            headers: {
              "Authorization": "Bearer " + localStorage.getItem("access"),
            },
    
            success: function () { // 성공 시
                window.location.href = "post_detail.html"
            }
    
          });
    }

function delete_submit() {
    console.log('삭제 실행')
    // post_id=localStorage.getItem('post_id')
    console.log(post_id)
    $.ajax({

        type: "DELETE",
        url: `http://127.0.0.1:8000/community/${post_id}/`,
        processData: false,
        contentType: false,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function () { // 성공 시
            window.location.href = "http://127.0.0.1:5500/community/blind.html"
        }

        });
}
// 수정
function put_submit(){
    console.log('수정실행')
    // post_id=localStorage.getItem('post_id')
    console.log(post_id)
    window.location.href='http://127.0.0.1:5500/stady-front/community/post_change.html?id='+post_id
}

