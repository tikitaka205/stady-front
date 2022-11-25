
$(document).ready(function() {
    const FLAG = localStorage.getItem("access", '')
    console.log(FLAG)
    if(!FLAG){
        console.log("아무거나")
        window.location.href = "/user/login.html"
        return
    }
    post_detail()
});
let post_id=localStorage.getItem('community_post_id')
console.log("외부에서 post_id", post_id)
let login_user_id = JSON.parse(localStorage.getItem('payload')).user_id

function post_detail(){

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
            let img=response['img']
            let post_user_id = response['user_id']

            console.log("포스트 상세")
            console.log(img)
            console.log(hits)
            console.log("포스트유저id",post_user_id)
            console.log("로그인유저id",login_user_id)
            
            $('#title').append(title)
            $('#hits').append(hits)
            $('#user').append(user)
            $('#likes_count').append(likes_count)
            $('#likes_count2').append(likes_count)
            $('#content').append(content)
            $('#comments_count').append(comments_count)
            // $('#img').attr('src', `http://127.0.0.1:8000${img}`)
            console.log("이미지", img)
            if(img){
                $('#img').append(`<img src="http://127.0.0.1:8000${img}" style="width: 100%;">`)
            }
            hide_button();
            function hide_button(){
                if(post_user_id!=login_user_id){
                    $("#put_submit").hide();
                    $("#delete_submit").hide();
                }
                }
        }
            })
        }
        



$(document).ready(function () {
    comment()
});
    function comment() {
        console.log("코멘트에서 id 들고오기",post_id)
        const login_user_id = JSON.parse(localStorage.getItem('payload')).user_id
        // console.log("토큰 user_id 들고오기",login_user_id)

        $.ajax({
            type: "GET",
            url: `http://127.0.0.1:8000/community/${post_id}/comment`,
            data: {},

            success: function (response) {
                    for (let i = 0; i < response.length; i++) {
                        let content = response[i]['content']
                        let likes_count =response[i]['likes_count']
                        let user = response[i]['user']
                        let id = response[i]['id']
                        let created_date = response[i]['created_date']
                        let comment_user_id = response[i]['user_id']
                        console.log("코멘트의 유저id",comment_user_id)
                        console.log(response)
                        console.log("로그인 사용자의 유저 id",login_user_id)
                        if(comment_user_id==login_user_id){
                            temp_html=
                            `
                            <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">${user}</div>
                                ${content}
                              </div>
                              <div>${created_date} 작성</div>
                              <div style="margin-right:10px; margin-left:50px; cursor : pointer;" onclick="comment_put_submit(${id})">수정</div>
                              <div style="margin-right:10px; cursor : pointer;" onclick="comment_delete_submit(${id})">삭제</div>
                              <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                              <img src="https://cdn-icons-png.flaticon.com/512/3343/3343312.png" style="height:20px;">
                              ${likes_count}</div>
                            </li>
                            `
                          } else{
                            temp_html=
                            `
                            <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">${user}</div>
                                ${content}
                              </div>
                            
                              <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                              <img src="https://cdn-icons-png.flaticon.com/512/3343/3343312.png" style="height:20px;">
                              ${likes_count}</div>
                            </li>
                            `
                          }
                          $('#comment_list').append(temp_html)
                        }
                    }
                })
            }
            
            
            


// 게시글 삭제
function post_delete_submit() {
    console.log('삭제 실행')
    console.log(post_id)
    if(!confirm("정말 삭제하시겠어요?")){
        return false;
    }
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
            alert("게시글을 삭제했습니다")
            window.location.href = "http://127.0.0.1:5500/community/"
        }

        });
}

// 게시글 수정
function comment_put_submit(){
    // console.log('수정실행')
    // console.log(post_id)
    // localStorage.setItem('community_post_id',post_id)
    location.href='post_put.html'
}


// 게시글 좋아요
$('#like_submit').click( function() {
    like_submit()
    });
    function like_submit() {


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



// 댓글 작성

        function comment_submit() {
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
                    location.reload()
                }
        
                });
        }


// 댓글 좋아요
$('#comment_like_submit').click( function() {
    comment_like_submit(comment_id)
    console.log("comment_like",comment_id)
    });
    function comment_like_submit(comment_id) {

        $.ajax({
            
            type: "POST",
            url: `http://127.0.0.1:8000/community/${post_id}/${comment_id}/like/`,
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

            
// 댓글 삭제
function comment_delete_submit(comment) {
    console.log('삭제 실행')
    let comment_id = comment
    console.log(post_id)
    console.log(comment_id)
    if(!confirm("정말 삭제하시겠어요?")){
        return false;
    }
    $.ajax({

        type: "DELETE",
        url: `http://127.0.0.1:8000/community/${post_id}/comment/${comment_id}`,
        processData: false,
        contentType: false,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function () { // 성공 시
            alert("게시글을 삭제했습니다")
            location.reload()        }

        });
}
