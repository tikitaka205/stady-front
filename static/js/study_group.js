const hostUrl = 'http://127.0.0.1:8000'
console.log('안녕하세요 준호님')
function loadStudy() {

    const mainWrap = document.getElementById('main-wrap');
    const recommendWrap = document.getElementById('recommend-wrap');

    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/studies/`,

        success: function (result) {
            console.log("------------------------")
            console.log('next:', result['results']['studies'].length);
            let allTemp = ``
            for (var i = 0; i < result['results']['studies'].length; i++) {
                var study = result['results']['studies'][i]
                console.log(study)
                var temp = `
                                <div class="mb-3 col-md-4 col-sm-6 p-2" style="cursor: pointer;">
                                    <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${study.id})">
                                        <img src="${hostUrl}${study.thumbnail_img}" type="button" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${study.title}</h5>
                                            <p class="text-start" style =" overflow-x : hidden;">
                                                ${study.user}
                                            </p>
                                            <p>
                                                <i class="fas fa-user-alt" style="color:tomato;"></i> ${study.now_cnt}/${study.headcount}
                                            </p>
                                                
                                                <div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style="color : yellowgreen"></i> ${study.tags}</div>
                                        </div>
                                    </div>
                                </div>
                                `
                allTemp += temp
            }
            $('#main-wrap').html(allTemp)

            let allRecommendTemp = ``
            for (var i = 0; i < result['results']['recommend_studies'].length; i++) {
                var study = result['results']['recommend_studies'][i]
                console.log(study)
                var temp = `
                        <div class="mb-3 col-md-4 col-sm-6 p-2" style="cursor: pointer;">
                        <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${study.id})">
                            <img src="${hostUrl}${study.thumbnail_img}" type="button" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${study.title}</h5>
                                <p class="text-start" style =" overflow-x : hidden;">
                                    ${study.user}
                                </p>
                                <p>
                                    <i class="fas fa-user-alt" style="color:tomato;"></i> ${study.now_cnt}/${study.headcount}
                                </p>
                                    
                                    <div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style="color : yellowgreen"></i> ${study.tags}</div>
                                    <div class = "text-end" style = "position : absolute; right : 20px; top:20px;">
                                        <i style="color : tomato" class="fas fa-user-check">추천</i>
                                    </div>
                            </div>
                        </div>
                    </div>
                    `
                allRecommendTemp += temp
            }
            $('#main-recommend-wrap').html(allRecommendTemp)
            $('#next').attr('onclick', `page("${result.next}")`)
            $('#previous').attr('onclick', `page("${result.previous}")`)
        },
    });
}

function page(page) {
    console.log(page);
    const mainWrap = document.getElementById('main-wrap');
    const recommendWrap = document.getElementById('recommend-wrap');

    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: page,

        success: function (result) {
            console.log('성공:', result['studies']);
            let allTemp = ``
            for (var i = 0; i < result['results']['studies'].length; i++) {
                var study = result['results']['studies'][i]
                console.log(study)
                var temp = `
                                <div class="mb-3 col-md-4 col-sm-6 p-2" style="cursor: pointer;">
                                    <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${study.id})">
                                        <img src="${hostUrl}${study.thumbnail_img}" type="button" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${study.title}</h5>
                                            <p class="text-start" style =" overflow-x : hidden;">
                                                ${study.user}
                                            </p>
                                            <p>
                                                <i class="fas fa-user-alt" style="color:tomato;"></i> ${study.now_cnt}/${study.headcount}
                                            </p>
                                                
                                                <div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style="color : yellowgreen"></i> ${study.tags}</div>
                                        </div>
                                    </div>
                                </div>
                                `
                allTemp += temp
            }
            $('#main-wrap').html(allTemp)

            let allRecommendTemp = ``
            for (var i = 0; i < result['results']['recommend_studies'].length; i++) {
                var study = result['results']['recommend_studies'][i]
                console.log(study)
                var temp = `
                                <div class="mb-3 col-md-4 col-sm-6 p-2" style="cursor: pointer;">
                                <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${study.id})">
                                    <img src="${hostUrl}${study.thumbnail_img}" type="button" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${study.title}</h5>
                                        <p class="text-start" style =" overflow-x : hidden;">
                                            ${study.user}
                                        </p>
                                        <p>
                                            <i class="fas fa-user-alt" style="color:tomato;"></i> ${study.now_cnt}/${study.headcount}
                                        </p>
                                            
                                            <div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style="color : yellowgreen"></i> ${study.tags}</div>
                                            <div class = "text-end" style = "position : absolute; right : 20px; top:20px;">
                                                <i style="color : tomato" class="fas fa-user-check">추천</i>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            `
                allRecommendTemp += temp
            }
            $('#main-recommend-wrap').html(allRecommendTemp)
            $('#next').attr('onclick', `page("${result.next}")`)
            $('#previous').attr('onclick', `page("${result.previous}")`)
        },
    });
}

function viewStudy(study_id) {

    const modal = document.getElementById('staticBackdrop');
    let tumbnailImg = document.getElementById('tumbnail-img');
    console.log(study_id)

    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/studies/${study_id}/`,

        success: function (result) {
            let studyDetail = result["study_detail"]
            let recommendStudies = result["recommend_studies"]
            console.log('성공:', result, result['thumbnail_img']);
            // $('#thumbnail-img').attr('src', result['thumbnail_img']);
            $('#modal-head').attr('style', `background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${hostUrl}${studyDetail['thumbnail_img']});
                                            background-position: center;
                                            background-size: cover;
                                            height : 450px;
                                            display: flex;
                                            padding : 35px
                `)
            $('#study-title').text(studyDetail['title'])
            $('#author').text(studyDetail['user'])
            $('#content').html(studyDetail['content'])

            let isStudent = studyDetail['is_student']
            let isAuthor = studyDetail['is_author']
            let sended = studyDetail['sended']
            let onOffLine = studyDetail['on_off_line']
            let isLike = studyDetail['is_like']
            let headCount = studyDetail['headcount']
            let nowCnt = studyDetail['now_cnt']
            let tags = studyDetail['tags']

            let student = result['student']
            console.log("---------------------------------------")
            console.log("student check: ", student)

            $('#study-ratio').text(`${nowCnt}/${headCount}`)
            $('#study-tags').html(`<div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style="color : yellowgreen"></i> ${tags}</div>`)



            if (isAuthor) {
                $('#status').text('수정 하기')
                $('#status').attr('class', 'btn btn-outline-warning')
                const temp_html = document.createElement('div')
                if (student.length > 0) {
                    for (let i = 0; i < student.length; i++) {
                        let temp = ''
                        console.log(student[i].user)
                        if (student[i].is_accept == true) {
                            temp = `
                                <div>${student[i].user}
                                    <button id="is_Student" type="button" onclick="">신청 거절</button>
                                </div>
                            `
                            // $('#student_list').html(temp)
                        } else {
                            temp = `
                                <div>${student[i].user}
                                    <button id="is_Student" type="button" onclick="isStudent(${student[i].user_id}, ${student[i].post}, ${student[i].is_accept})" value="true">신청 수락</button>
                                    <button id="is_Student" type="button" onclick="">신청 거절</button>
                                </div>
                            `
                            // $('#student_list').html(temp)
                        }
                        temp_html.appendChild(temp)
                    }
                }
                $('#student_list').html(temp_html)


            } else if (isStudent) {
                $('#status').text('탈퇴 하기')
                $('#status').attr('onclick', `propose(${studyDetail.id}, "cancle")`)
            } else if (sended) {
                $('#status').html('<i class="fas fa-times">신청취소</i>')
                $('#status').attr('onclick', `propose(${studyDetail.id}, "cancle")`)
                $('#status').attr('class', 'btn btn-outline-danger')
            } else {
                $('#status').html('<i class="fas fa-paper-plane">신청하기</i>')
                $('#status').attr('onclick', `propose(${studyDetail.id}, "propose")`)
                $('#status').attr('class', 'btn btn-primary')
            }

            if (isLike) {
                $('#star').attr('class', 'fas fa-star')
            } else {
                $('#star').attr('class', 'far fa-star')
            }
            $('#star').attr('onclick', `studyLike(${studyDetail.id})`)
            if (recommendStudies) {
                loadRecommendStudy(recommendStudies)
            }
        },

    });
    $('#staticBackdrop').modal('show')
}

async function isStudent(user_id, post_id, is_accept) {
    if (is_accept == null) {
        const login_user = JSON.parse(localStorage.getItem('payload')).user_id
        console.log(login_user)
        const result = document.getElementById("is_Student").value
        console.log(document.getElementById("is_Student").value)
        // $.ajax({
        //     type: "POST",
        //     data: {},
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     url: `${hostUrl}/${post_id}/accept/${user_id}`,
        //     success: function

        // });
        const response = await fetch(`${hostUrl}/studies/${post_id}/accept/${user_id}/`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: "POST",
            body: JSON.stringify({
                user_id: user_id,
                post: post_id,
                is_accept: result
            }),
        })
        const response_json = await response.json()
        console.log(response_json)
    }
}

function propose(study_id, type) {
    console.log('dd')
    $.ajax({
        type: 'GET',

        data: { type: type },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/studies/${study_id}/propose`,

        success: function (result) {
            if (type === "propose") {
                $('#status').html('<i class="fas fa-times">신청취소</i>')
                $('#status').attr('onclick', `propose(${study_id}, "cancle")`)
                $('#status').attr('class', 'btn btn-outline-danger')
            } else if (type === "cancle") {
                $('#status').html('<i class="fas fa-paper-plane">신청하기</i>')
                $('#status').attr('onclick', `propose(${study_id}, "propose")`)
                $('#status').attr('class', 'btn btn-primary')
            }

        },
    });
}
function loadRecommendStudy(recommendStudy) {
    let allTemp = ``
    for (var i = 0; i < recommendStudy.length; i++) {
        var study = recommendStudy[i]
        console.log(study)
        var temp = `
                <div class="col-lg-4 col-md-6" style="cursor: pointer; padding : 15px">
                            <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${study.id})">
                                <img src="${hostUrl}${study.thumbnail_img}" type="button" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${study.title}</h5>
                                    <p class="text-start text-second" style =" overflow-x : hidden;">
                                        ${study.user} </br>
                                        <i class="fas fa-user-alt" style="color:tomato"></i> ${study.now_cnt}/${study.headcount}
                                        <div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style = "color : yellowgreen;"></i> ${study.tags}</div>
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
            `
        allTemp += temp
    }
    $('#recommend-wrap').html(allTemp)
}

function studyLike(study_id) {
    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/studies/${study_id}/like`,

        success: function (result) {
            var starClass = $('#star').attr('class')
            if (starClass === 'fas fa-star') {
                $('#star').attr('class', 'far fa-star')
            } else {
                $('#star').attr('class', 'fas fa-star')
            }
        },
    });
}



function search() {
    const mainWrap = document.getElementById('main-wrap');
    let search_input = document.getElementById("search_input").value;
    console.log('검색성공')

    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/studies/search/?search=${search_input}`,

        success: function (result) {
            console.log('성공:', result);
            let allTemp = ``
            for (var i = 0; i < result.length; i++) {
                var study = result[i]
                // console.log(study)
                var temp = `
                        <div class="mb-3 col-md-4 col-sm-6 p-2" style="cursor: pointer;">
                            <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${study.id})">
                                <img src="${hostUrl}${study.thumbnail_img}" type="button" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${study.title}</h5>
                                    <p class="text-start text-second">
                                        ${study.user} </br>
                                        <i class="fas fa-user-alt"></i> ${study.now_cnt}/${study.headcount}</br>
                                        <span><i class="fas fa-tags"></i> ${study.tags}</span></br>
                                    </p>
                                </div>
                            </div>
                        </div>
                    `
                allTemp += temp
            }
            $('#main-wrap').html(allTemp)
        },

    });
}