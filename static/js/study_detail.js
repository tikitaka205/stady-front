
    const hostUrl = "http://127.0.0.1:8000"
    const STUDYID = JSON.parse(localStorage.getItem('stady', ''))["recent_study_id"]
    const payload = JSON.parse(localStorage.getItem('payload', ''))
    // const fomatter = new Intl.RelativeTimeFormat('ko', {numeric : 'auto'})
    const DATE = new Date()
    console.log(DATE)
    // const DATE = new Date().toLocaleDateString

    window.onload = function() {
        $('#ttt').html(`<time class="timeago" datetime="${DATE}"></time>`)
        $("time.timeago").timeago();

        getStudy()
    }
    function getStudy(){
        $('#pagination').empty()
        $.ajax({
            type: 'GET',

            data: {},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/private/?community-type=info`,

            success: function (result) {
                console.log(result,result["is_penalty"])
                $('#content-wrap').html(result["content"])
                let students = result["students"]
                
                if (result["is_penalty"]){
                    
                    var limitType = result["limit_type"]
                    var limitTime = result["limit_time"]
                    var numDays = result["days"]
                    
                    if(limitType === 'CT'){
                        limitType = '출석 체크 스터디!'
                    }else{
                        limitType = '공부 시간 스터디!'
                    }

                    // 이럴거면 숫자말고 '월화수' 이런 식으로 저장하는게 났지 않았냐?
                    var days = ``
                    for(var i = 0; i<numDays.length; i ++){
                        var week = '월화수목금토일'
                        var idx = Number(numDays[i])

                        days +=`
                        <span class ="m-2 p-1" style="border-radius : 10px;border: 1px solid red;">${week[idx]}</span>
                        `
                    }
                    // if문 for문 할거 다 하고 한번에 넣어도 괜찮을 듯
                    $('#total-penalty').html(`총 금액 : <span style="font-weight : 600;color:blue">${result['total_penalty']}</span>`)
                    $('#week-penalty').html(`이번주 모인 벌금 : <span style="font-weight : 600;color:red">${result['week_penalty']}</span>`)

                    $('#limit-time').html(`<span style = "font-size : 18px">제한 시간(시각)</span> : ${result['limit_time']} <span style="font-size:15px">( 시간 혹은 시각)</span>`)
                    $('#limit-type').html(`<span style = "font-size : 18px">스터디 종류</span> : ${limitType}`)
                    $('#penalty').html(`<span style = "font-size : 18px">벌금</span> : <span style="font-weight : 600;color:green">${result['penalty']}</span>`)
                    $('#days').html(`<span style = "font-size : 18px">확인할 요일</span> : ${days}`)

                }

                if(result["user"] == payload["user_id"]){
                    studyAuthor(result)
                }
                else{
                    studyStudent(result)
                }
            },
        });
    }


    function getStudyPost(page=1) {
        $('#sub-content-wrap').empty()
        $('#propose-student-wrap').empty()

        $.ajax({
            type: 'GET',

            data: {},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/private/?page=${page}`,

            success: function (result) {
                console.log('스터디', result)
                var postList = result['post_list']
                var curPage = result["cur_page"]
                var totalPage = result["page_cnt"]

                var temp = ``
                for(var i = 0; i < postList.length; i++){
                    var post = postList[i]
                    var time = post["create_dt"].slice(undefined,-7) + "Z"

                    temp += `
                        <div class = "" style="cursor: pointer;" onclick="getStudyPostDetail(${post['id']})">
                            <div class = "text-secondary">
                                ${post['author']}
                            </div>
                            <div class = "" style= "font-weight : 600">
                                ${post['title']}
                            </div>
                            <div class="text-secondary">
                                <span>
                                    <i class="far fa-heart" style = "color : red;"></i>
                                    ${post["like_count"]}
                                </span>
                                <span style="margin-left : 5px">
                                    <i class="far fa-comment"></i>
                                    ${post["comment_count"]}
                                </span>
                                <span style="margin-left : 5px">                            
                                    <i class="far fa-clock" ></i>
                                    <time class="timeago" datetime="${time}"></time>    
                                </span>
                            </div>
                        </div>
                    `
                }
                $('#content-wrap').html(temp);
                $("time.timeago").timeago();

                var pages = get_pages(totalPage, curPage)
                var prevPage = (curPage - 1 > 0) ? curPage - 1 : 0
                var nextPage = (curPage < totalPage) ? curPage +1 : 0

                console.log(pages, prevPage, nextPage)
                var temp = (prevPage === 0)? `<li class="page-item disabled" ><span class="page-link">Prev</span></li>` : `<li class="page-item"><span class="page-link" onclick="getStudyPost(${prevPage})">Prev</span></li>`

                for(var i = 0; i < pages.length; i++){
                    if (curPage === pages[i]){
                        temp += `
                            <li class="page-item active">
                                <span class="page-link" onclick="getStudyPost(${pages[i]})">
                                    ${pages[i]}
                                </span>
                            </li>
                        `
                    }else{
                        temp += `
                            <li class="page-item">
                                <span class="page-link" onclick="getStudyPost(${pages[i]})">
                                    ${pages[i]}
                                </span>
                            </li>
                        `
                    }
                    
                }
                if (nextPage !== 0){
                    temp += `
                            <li class="page-item">
                                <span class="page-link" onclick="getStudyPost(${nextPage})">
                                    Next
                                </span>
                            </li>
                        `
                }else{
                    temp += `
                            <li class="page-item disabled" >
                                <span class="page-link">
                                    Next
                                </span>
                            </li>
                        `
                }

                $('#pagination').html(temp)
                


            },
        });
    }


    function get_pages(totalPage, curPage){
        console.log('pages()..')

        let pages3 = [];

        if (totalPage === 1) pages3=[1]
        else if (totalPage === 2) pages3=[1,2]
        else if (totalPage >= 3){
            if (curPage === 1) pages3 = [1,2,3]
            else if (curPage === totalPage) pages3 = [totalPage-2,totalPage-1, totalPage]
            else pages3 = [curPage-1, curPage, curPage+1]
        }
        return pages3
    }
    

    function getStudyPostDetail(postId){

        console.log(postId)

        $.ajax({
            type: 'GET',

            data: {},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/private/${postId}/`,

            success: function (result) {
                console.log('포스트 디테일', result)
                var commentList = result['comments']
                var time = new Date(result["create_dt"]).toLocaleDateString() + new Date(result["create_dt"]).toLocaleTimeString()
                // var time = result["create_dt"].slice(undefined,-7) + "Z"

                var temp = `
                <div id="post-info" class = "text-secondary" style = "margin-left : 10px">
                    <i class="fas fa-user"></i>
                    <span>${result["author"]}</span>
                    <i class="far fa-clock ml-2"></i>
                    <span>${time}</span>
                </div>
                `
                $('#modal-info').html(temp)
                if(payload["user_id"] == result["author_id"]){
                    $('#post-info').append(`<span class ="btn btn-outline-warning p-1" onclick = "postDelete(${result['id']})">삭제하기</span>`)
                }



                $('#modal-head').text(result["title"])
                $('#modal-body').html(result["content"])
                $('#like-num').text(result['like'])

                var allTemp = ``
                for(var i = 0; i < commentList.length; i++){
                    var comment = commentList[i]
                    var time = comment["create_dt"].slice(undefined,-7) + "Z"
                    console.log(time)
                    var temp = `
                    <div id="post-comment-${comment["id"]}" class="m-2">
                        <div class = "text-secondary row">
                            <div class = "col-6">
                                ${comment["author"]}
                    `
                    if(comment["author_id"] == payload["user_id"]){
                        temp += `
                        <span style = "margin-left : 10px; cursor: pointer; color : orange;" onclick = commentDelete(${postId},${comment["id"]})>
                            댓글 삭제
                        <span>
                        
                        `
                    }
                                
                    temp += `
                            </div>
                            <div class = "col-6 text-end">
                                <time class="timeago" datetime="${time}"></time>
                            </div>
                        </div>
                        <div class = "" style = "margin-left : 10px">
                                ${comment["content"]}                            
                        </div>
                    </div>
                    `
                    allTemp += temp
                }
                $('#modal-comment').html(allTemp);
                $('#comment-submit').attr('onclick', `sumbmitComment(${postId})`)
                $('#exampleModal').modal('show')
                $("time.timeago").timeago();
                // $("time.timeago").timeago("update", new Date());

                $('#post-like').attr('onclick', `postLike(${postId})`)
                // <i class="fas fa-heart"></i>
                // <i class="far fa-heart"></i>
                if (result["is_like"]){
                    $('#heart').attr('class', 'fas fa-heart')
                }else{
                    $('#heart').attr('class', 'far fa-heart')
                }
            },
        });
    }

    function studyAuthor(result){
        let students = result["students"]
        let isPenalty = result["is_penalty"]
        var temp = `
            <div class = "text-center mb-3" style="font-weight : 600;">
                <i class="fas fa-user-circle"></i>
                스터디 멤버들
            </div>
        `
        for (var i = 0; i < students.length; i++){
            var student = students[i]

            if(payload["user_id"] == student['user_id']){
                if(isPenalty == true){
                    temp += `
                        <div class = "p-2" style = "" >
                            ${student['user']}
                            <span style="margin-left : 15px"> 이번 주 벌금 : <span style = "color:orange; font-size : 20px">${student['week_penalty']}</span></span>
                            <span style="margin-left : 15px"> 총 벌금 : <span style = "color:red; font-size : 20px">${student['total_penalty']}</span></span>
                        </div>
                    `
                }else{
                    temp += `
                    <span class = "p-2" style = "margin-left : 5px;" >${student['user']}</span>
                    `
                }
                
            }else{
                if(isPenalty == true){
                    temp += `
                        <div class = "" style = "margin-left : 5px;"  id="student-${student['id']}">
                            <span id="student-name-${student['id']}">${student['user']}</span>
                            <span>이번 주 벌금 : <span style = "color:orange; font-size : 20px">${student['week_penalty']}</span></span>
                            <span>총 벌금 : <span style = "color:red; font-size : 20px">${student['total_penalty']}</span></span>
                            <button class="btn btn-outline-danger p-1" style = "margin-left : 5px" onclick="banishStudent(${student['id']})">
                                추방
                            </button>
                        </div>                    
                    `
                }else{
                    temp += `
                        <span class = "p-2" style = "margin-left : 5px;"  id="student-${student['id']}">
                            <span id="student-name-${student['id']}">${student['user']}</span>
                            <button class="btn btn-outline-danger p-1" style = "margin-left : 5px" onclick="banishStudent(${student['id']})">
                                추방
                            </button>
                        </span>
                    `
                }
                
            }
            
        }
        $('#sub-content-wrap').html(temp)

        let proposeStudents = result["propose_students"]
        var temp = `
            <div class = "text-center mb-3" style="font-weight : 600;">
                <i class="far fa-paper-plane"></i>
                신청인원
            </div>
        `

        for (var i = 0; i < proposeStudents.length; i++){
            var student = proposeStudents[i]
            temp += `
            <div id="student-${student['id']}">
                <span id="student-name-${student['id']}">${student["user"]}</span>
                <button class="btn btn-outline-primary" onclick = acceptStudent(${student["id"]})>수락</button>
                <button class="btn btn-outline-warning" onclick = banishStudent(${student["id"]})>거절</button>
            </div>
            `
        }
        $('#propose-student-wrap').html(temp)
    }

    function studyStudent(result){
        let students = result["students"]
        let isPenalty = result["is_penalty"]

        var temp = `
            <div class = "text-center mb-3" style="font-weight : 600;">
                <i class="fas fa-user-circle"></i>
                스터디 멤버들
            </div>
        `
        for (var i = 0; i < students.length; i++){
            var student = students[i]

            if(isPenalty == true){
                temp += `
                <div class = "" style = "" >
                    ${student['user']}
                    <span>이번 주 벌금 : <span style = "color:orange; font-size : 20px">${student['week_penalty']}</span></span>
                    <span>총 벌금 : <span style = "color:orange; font-size : 20px">${student['total_penalty']}</span></span>
                </div>
                `
            }else{
                temp += `
                <span class = "p-2" style = "margin-left : 5px;" >${student['user']}</span>
                `
            }
                
        }
        $('#sub-content-wrap').html(temp)
    }

    function banishStudent(studentId){
        $.ajax({
            type: 'DELETE',

            data: {},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/choose/${studentId}/`,

            success: function (result) {
                console.log(result)
                $(`#student-${studentId}`).empty()
            },
        });
    }

    function acceptStudent(studentId){
        console.log(studentId)
        $.ajax({
            type: 'POST',

            data: {},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/choose/${studentId}/`,

            success: function (result) {
                var name = $(`#student-name-${studentId}`).text()
                $(`#student-${studentId}`).empty()

                var temp =`
                <div id="student-${studentId}">
                    <span>${name}</span>
                    <button class="btn btn-outline-danger p-1" style = "margin-left : 5px" onclick="banishStudent(${studentId})">
                        추방
                    </button>
                </div>
                `
                $('#sub-content-wrap').append(temp)
            },
        });
    }

    function sumbmitComment(postId){
        var postComment = $('#post-comment').val()
        console.log(postComment)
        $.ajax({
            type: 'POST',

            data: {content : postComment},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/private/${postId}/comment/`,

            success: function (result) {
                console.log(result)
                var temp = `
                <div id="post-comment-${result["id"]}" class="m-2">
                        <div class = "text-secondary row">
                            <div class = "col-6">
                                ${payload["username"]}
                                <span style = "margin-left : 10px; cursor: pointer; color : orange;" onclick = commentDelete(${postId},${result["id"]})>
                                    댓글 삭제
                                <span>
                            </div>
                            <div class = "col-6 text-end">
                                방금 전
                            </div>
                        </div>
                        <div class = "" style = "margin-left : 10px">
                            ${postComment}
                        </div>
                    </div>
                `
                $('#modal-comment').prepend(temp)
                $('#post-comment').val('')
            },
        });
    }

    function postLike(postId){
        console.log('postLike', postId)
        $.ajax({
            type: 'GET',

            data: {},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/private/${postId}/like/`,

            success: function (result) {
                if ($('#heart').hasClass('fas')){
                    $('#heart').attr('class', 'far fa-heart')
                    var num = $('#like-num').text()
                    $('#like-num').text(Number(num)-1)
                }else{
                    $('#heart').attr('class', 'fas fa-heart')
                    var num = $('#like-num').text()
                    $('#like-num').text(Number(num)+1)

                }
            },
        });
    }


    function commentDelete(postId, commentId){
        console.log('dd')
        if (confirm("정말 삭제하시겠습니까??") == false){    //확인
            return false
        }
        console.log('dds')
        $.ajax({
            type: 'DELETE',

            data: {},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/private/${postId}/comment/${commentId}`,

            success: function (result) {
                $(`#post-comment-${commentId}`).remove()         
            },
        });
    }

    function postDelete(postId){
        if (confirm("정말 삭제하시겠습니까??") == false){    //확인
            return false
        }
        console.log('dds')
        $.ajax({
            type: 'DELETE',

            data: {},
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },

            url: `${hostUrl}/studies/${STUDYID}/private/${postId}/`,

            success: function (result) {
                console.log('삭제 성공')
            },
        });
    }