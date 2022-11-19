$(document).ready(function () {
    post_detail()
});
    function post_detail() {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/blind/2",
            data: {},
            success: function(response){
            console.log(response)
            let title = response['title']
            let content = response['content']
            let hits = response['hits']
            let user = response['user']
            let likes_count = response['likes_count']
            let comments_count = response['comments_count']

            console.log("title", title)
            console.log("content", content)
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
// html에서 게시글 눌렀을때 onclick q했을때 (안에다가 post_id 인자) 넣어서 보내기
$(document).ready(function () {
    comment()
});
    function comment() {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/blind/2/comment",
            data: {},

            success: function (response) {
                console.log(response)
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
            



// function post_like() {
//     $.ajax({
//         type: "POST",
//         url: "",
//         data: {},

//         success: function (response) {
//             console.log(response)
//                 for (let i = 0; i < response.length; i++) {
//                     let content = response[i]['content']
//                     let likes_count =response[i]['likes_count']
//                     let user = response[i]['user']
//                     temp_html=
//                     `
//                     <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px">
//                     <div class="ms-2 me-auto">
//                         <div class="fw-bold">${user}</div>
//                         ${content}
//                     </div>
//                     <span class="badge bg-primary rounded-pill">${likes_count}</span>
//                     </li>
//                     `
//                 $('#comment_list').append(temp_html)
//                 }
            
        
//         }







// function Comment() {
//     let content = $('#content').val()
//     let formData = new FormData();
//     formData.append("content", content)


//     $.ajax({
//         type: 'POST',

//         data: {},
//         headers : {
//             "Authorization" : "Bearer " + localStorage.getItem("access"),
//         },
//         url: "http://127.0.0.1:8000/blind/2/comment/",

//         success: function (result) {
//             console.log('성공:', result);
//             insertLog(result)

//         },
//     });
// }