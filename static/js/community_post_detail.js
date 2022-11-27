
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
            let likes = response['likes']

            console.log("포스트 상세")
            console.log(img)
            console.log(hits)
            console.log(likes)
            console.log("포스트유저id",post_user_id)
            console.log("로그인유저id",login_user_id)
            
            $('#title').append(title)
            $('#hits').append(hits)
            $('#user').append(user)
            $('#likes_count').append(likes_count)
            $('#likes_count2').append(likes_count)
            $('#content').append(content)
            $('#comments_count').append(comments_count)
            console.log("이미지", img)
            if(img){
                $('#img').append(`<img src="http://127.0.0.1:8000${img}" style="width: 100%;">`)
            }
            if(likes.includes(login_user_id)){
                    $('#like_img').attr('src','https://cdn-icons-png.flaticon.com/512/456/456115.png')
                    $('#like_img_btn').attr('style','background-color: #ff8b8b; color: black; margin-right: 10px; ')
            }else{
                $('#like_img').attr('src','https://cdn-icons-png.flaticon.com/512/456/456257.png')
            }
            hide_button();
            hide_comment_page();
            function hide_button(){
                if(post_user_id!=login_user_id){
                    $("#put_submit").hide();
                    $("#delete_submit").hide();
                }
              }
            function hide_comment_page(){
                if(comments_count<5){
                    $("#previous").hide();
                    $("#next").hide();
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

        $.ajax({
            type: "GET",
            url: `http://127.0.0.1:8000/community/${post_id}/comment`,
            data: {},

            success: function (response) {
                    console.log(response)
                    let comments_count=response['count']
                    for (let i = 0; i < response['results'].length; i++) {
                        let content = response['results'][i]['content']
                        let likes_count =response['results'][i]['likes_count']
                        let user = response['results'][i]['user']
                        let id = response['results'][i]['id']
                        let comment_user_id = response['results'][i]['user_id']
                        let likes = response['results'][i]['likes']
                        var time = response['results'][i]["created_date"] + "Z"
                        let next=response['next']
                        let previous=response['previous']

                        console.log("코멘트의 유저id",comment_user_id)
                        console.log(response)
                        console.log("코멘트 개수",comments_count)
                        console.log("로그인 사용자의 유저 id22",login_user_id)
                        if(comment_user_id==login_user_id){
                            if(likes.includes(login_user_id)){
                            temp_html=
                            `
                            <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">${user}</div>
                                ${content}
                              </div>
                              <div><time class="timeago" datetime="${time}"> 작성</div>
                              <div style="margin-right:10px; margin-left:50px; cursor : pointer;" onclick="comment_put_submit(${id})">수정</div>
                              <div style="margin-right:10px; cursor : pointer;" onclick="comment_delete_submit(${id})">삭제</div>
                              <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                              <img id="comment_img" src="https://cdn-icons-png.flaticon.com/512/456/456115.png" style="height:20px;">
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
                                  <div><time class="timeago" datetime="${time}"> 작성</div>
                                  <div style="margin-right:10px; margin-left:50px; cursor : pointer;" onclick="comment_put_submit(${id})">수정</div>
                                  <div style="margin-right:10px; cursor : pointer;" onclick="comment_delete_submit(${id})">삭제</div>
                                  <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                                  <img id="comment_img" src="https://cdn-icons-png.flaticon.com/512/456/456257.png" style="height:20px;">
                                  ${likes_count}</div>
                                </li>
                                `
                            }
                          } else{
                            if(likes.includes(login_user_id)){
                            temp_html=
                            `
                            <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">${user}</div>
                                ${content}
                              </div>
                              <div><time class="timeago" datetime="${time}"> 작성</div>

                              <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                              <img id="comment_img" src="https://cdn-icons-png.flaticon.com/512/456/456115.png" style="height:20px;">
                              ${likes_count}</div>
                            </li>
                            `
                            }else{
                                temp_html=
                                `
                                <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                                  <div class="ms-2 me-auto">
                                    <div class="fw-bold">${user}</div>
                                    ${content}
                                  </div>
                                  <div><time class="timeago" datetime="${time}"> 작성</div>

                                  <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                                  <img id="comment_img" src="https://cdn-icons-png.flaticon.com/512/456/456257.png" style="height:20px;">
                                  ${likes_count}</div>
                                </li>
                                `
                            }
                          }

                          $('#comment_list').append(temp_html)
                          $("time.timeago").timeago();
                          $('#next').attr('onclick', `page("${next}")`)
                          $('#previous').attr('onclick', `page("${previous}")`)
                          // 코멘트 개수적으면 페이지네이션 버튼 없애기 일단 댓글개수 4개로 했습니다.
                          hide_comment_page();
                          function hide_comment_page(){
                              if(comments_count<5){
                                  $("#previous").hide();
                                  $("#next").hide();
                              }
                            }
                            }
                        }
                })}
            
            
// 댓글 페이지네이션
function page(page) {
    console.log("코멘트에서 id 들고오기",post_id)
    const login_user_id = JSON.parse(localStorage.getItem('payload')).user_id

    $.ajax({
        type: "GET",
        url: page,
        data: {},

        success: function (response) {
                $('#comment_list').empty()

                console.log(response)
                for (let i = 0; i < response['results'].length; i++) {
                    let content = response['results'][i]['content']
                    let likes_count =response['results'][i]['likes_count']
                    let user = response['results'][i]['user']
                    let id = response['results'][i]['id']
                    let comment_user_id = response['results'][i]['user_id']
                    let likes = response['results'][i]['likes']
                    var time = response['results'][i]["created_date"] + "Z"
                    let next=response['next']
                    let previous=response['previous']

                    console.log("코멘트의 유저id",comment_user_id)
                    console.log(response)
                    console.log("로그인 사용자의 유저 id22",login_user_id)
                    if(comment_user_id==login_user_id){
                        if(likes.includes(login_user_id)){
                        temp_html=
                        `
                        <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">${user}</div>
                            ${content}
                          </div>
                          <div><time class="timeago" datetime="${time}"> 작성</div>
                          <div style="margin-right:10px; margin-left:50px; cursor : pointer;" onclick="comment_put_submit(${id})">수정</div>
                          <div style="margin-right:10px; cursor : pointer;" onclick="comment_delete_submit(${id})">삭제</div>
                          <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                          <img id="comment_img" src="https://cdn-icons-png.flaticon.com/512/456/456115.png" style="height:20px;">
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
                              <div><time class="timeago" datetime="${time}"> 작성</div>
                              <div style="margin-right:10px; margin-left:50px; cursor : pointer;" onclick="comment_put_submit(${id})">수정</div>
                              <div style="margin-right:10px; cursor : pointer;" onclick="comment_delete_submit(${id})">삭제</div>
                              <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                              <img id="comment_img" src="https://cdn-icons-png.flaticon.com/512/456/456257.png" style="height:20px;">
                              ${likes_count}</div>
                            </li>
                            `
                        }
                      } else{
                        if(likes.includes(login_user_id)){
                        temp_html=
                        `
                        <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">${user}</div>
                            ${content}
                          </div>
                          <div><time class="timeago" datetime="${time}"> 작성</div>

                          <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                          <img id="comment_img" src="https://cdn-icons-png.flaticon.com/512/456/456115.png" style="height:20px;">
                          ${likes_count}</div>
                        </li>
                        `
                        }else{
                            temp_html=
                            `
                            <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">${user}</div>
                                ${content}
                              </div>
                              <div><time class="timeago" datetime="${time}"> 작성</div>

                              <div id="comment_like_submit" onclick="comment_like_submit(${id})" style="cursor : pointer;">
                              <img id="comment_img" src="https://cdn-icons-png.flaticon.com/512/456/456257.png" style="height:20px;">
                              ${likes_count}</div>
                            </li>
                            `
                        }
                      }

                      $('#comment_list').append(temp_html)
                      $("time.timeago").timeago();
                      $('#next').attr('onclick', `page("${next}")`)
                      $('#previous').attr('onclick', `page("${previous}")`)
                                            }
                    }
            })}


function set_page(){  
        $("#test").load(window.location.href + "#test");
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

// 게시글 공유 url 복사
function url_copy(){
	var url = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	url = window.document.location.href;
	textarea.value = url;
	textarea.select();
  document.execCommand("copy");   // 복사
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.")
}