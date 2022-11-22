window.onload = function(){
    post_change_get()
}
let post_id = document.location.href.split("=")[1];
function post_change_get(){
    console.log('게시글 수정 페이지 실행')
    console.log(post_id)
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/blind/${post_id}/`,
        data: {},
        success: function(response){
        console.log(response)
        let title = response['title']
        let content = response['content']
        // let img = response['image']
        let category = response['category']

        console.log(title, content)
        
        let temp_html_title=`
        <label for="exampleFormControlInput1" class="form-label"></label>
        <input type="text" class="form-control" id="title" name='title' required value=${title}></input>
        `
        $('#post-title').append(temp_html_title)

        let temp_html_content =`
        <label for="exampleFormControlTextarea1" class="form-labe2"></label>
              <textarea class="form-control" id="content" name='content' rows="12"required>${content}</textarea>
        `
        $('#post-content').append(temp_html_content)

        }
    })
}

post_change_post =async()=>{
    title = document.getElementById('title').value
    content = document.getElementById('content').value
    category = 'blind' //블라인드 게시판이었는지 확인작업 필요

    console.log('포스트 수정 실행')
    console.log(post_id)
    const response = await fetch('http://127.0.0.1:8000/blind/'+post_id+'/', {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: 'PUT',
        body: JSON.stringify({
            "title":title,
            "category":category,
            "content":content
        })
        
    })
    if(response.status == 200){
        window.location.href = 'http://127.0.0.1:5500/stady-front/community/blind.html'
    }
}