document.write('<script src="/static/js/study_group.js"></script>');
// const hostUrl = 'http://127.0.0.1:8000'

$(document).ready(function () {
    console.log("접속")
    study_log()
});


function day_log(date) {
    $('#study_log').empty()
    $('#total').empty()
    $.ajax({
        type: "GET",
        url: `${hostUrl}/my_profile/daylog/${date}`,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        data: {},
        success: function (response) {
            let log = response['serialize_log']
            let day_study_time = response['day_study_time']
            for (let i = 0; i < log.length; i++) {
                let start_time = log[i]['start_time']
                let end_time = log[i]['end_time']
                let memo = log[i]['memo']
                let sub_time = log[i]['sub_time']
                let id = log[i]['id']


                let temp_html = `
                <div id="today-log" style="max-height: 800px; ">
                <div class="row mb-2">
                  <div class="col-4">${start_time} ~ ${end_time}(${sub_time}분)</div>
                  <div class="col-8 row">
                    <div class="col-8" id="memo-${id}"">${memo}</div>
                      <div class=" col-4 text-end">
                          <button onclick="writeMemo(${id})" type="button" class="btn btn-success" style="font-size : 12px;"
                              data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                              메모/수정/dd
                          </button>
                      </div>
                  </div>
                </div>
                
                </div> 
                `
                $('#study_log').append(temp_html)
            }
            let total = `
                <h6>오늘의 총 공부 시간 : ${day_study_time}분</h6>
                `
            $('#total').append(total)

        }
    })
}


function study_log() {
    setStudyLogWrap()
    $('#userinfo').empty()
    $.ajax({
        type: "GET",
        url: `${hostUrl}/my_profile/studylog/`,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        data: {},
        success: function (response) {
            if (response['log'].length > 0) {
                let log = response['log']
                let id = log[0]['user']
                let profile_img = response['profile_img']
                console.log("image: ", profile_img)
                userinfo(id, profile_img)

                date_arr = []

                for (let i = 0; i < log.length; i++) {
                    let date = log[i]['date']
                    date_arr.push(date)
                }

                let date = [...new Set(date_arr)];
                console.log(date)

                for (let i = 0; i < date.length; i++) {
                    let day = date[i]
                    let temp_html = `
                        <div>
                        <a href ="#" onclick="day_log('${day}')">${day}</a>
                        </div> 
                    `
                    $('#study_day').append(temp_html)
                }

                for (let i = 0; i < log.length; i++) {
                    let start_time = log[i]['start_time']
                    let end_time = log[i]['end_time']
                    let memo = log[i]['memo']
                    let sub_time = log[i]['sub_time']
                    let id = log[i]['id']
                    // let date = log[i]['date']
                    let temp_html = `
                    <div id="today-log" style="max-height: 800px; ">
                    <div class="row mb-2">
                    <div class="col-4">${start_time} ~ ${end_time}(${sub_time}분)</div>
                    <div class="col-8 row">
                        <div class="col-8" id="memo-${id}"">${memo}</div>
                        <div class=" col-4 text-end">
                            <button onclick="writeMemo(${id})" type="button" class="btn btn-success" style="font-size : 12px;"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                메모/수정
                            </button>
                        </div>
                    </div>
                    </div>
                    
                    </div> 
                    `
                    $('#study_log').append(temp_html)

                }
            }
        }
    })
}

function userinfo(id, profile_img) {
    // user_log
    $.ajax({

        type: "GET",
        url: `${hostUrl}/my_profile/${id}/`,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        data: {},
        success: function (response) {
            let info = response
            let name = info['username']
            let bio = info['bio']
            let total_time = info['total_time']
            let temp_html = `
            <div class="col-3">
            <img src="${hostUrl}${profile_img}" width="30px" height="30px" alt="">
            <span>${name}</span>
            </div>
            <div class="col-5 text-start">
                <span>${name}의 다짐 :</span>
                <span>${bio}</span>
            </div>

            <div class="col-4 text-start">
            <span>총 공부 시간 :</span>
            <span>${total_time} 분</span>
            </div>
        `
            $('#userinfo').append(temp_html)
        }
    })
}


function writeMemo(logId) {
    console.log('writememo function')
    let modal = document.getElementById('staticBackdrop');
    let submitButton = document.getElementById('memo-submin-btn');
    let memo = document.getElementById(`memo-${logId}`);
    let memoTitle = document.getElementById('memo-title');


    modal.setAttribute('class', 'modal fade show');
    modal.setAttribute('style', 'display: block;');
    submitButton.setAttribute('onclick', `submitMemo(${logId})`)
    memoTitle.value = memo.innerText;
    console.log(logId)

    $('#staticBackdrop').modal('show')

    // modal.setAttribute('class', 'modal fade show');
    // modal.removeAttribute('style');
}

async function submitMemo(logId) {
    //fetch로 전달해볼까?
    console.log(logId)
    console.log('submitmemo function')
    var memoTitle = document.getElementById('memo-title').value; // 모달 인풋 값에 입력한 값
    var memo = document.getElementById(`memo-${logId}`); // 공부 로그에 남긴 메모
    console.log('메모 타이틀: ' + memoTitle)
    console.log('메모: ' + memo)


    const response = await fetch(`${hostUrl}/my_profile/memolog/${logId}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({
            "memo": memoTitle,
        })
    })
    memo.innerText = ''; // 텍스트 지우기
    memo.append(memoTitle);

    closeMemo()
}


function closeMemo() {
    console.log('closememo function 실행')
    let modal = document.getElementById('staticBackdrop');
    let memoTitle = document.getElementById('memo-title');
    let submitButton = document.getElementById('memo-submin-btn');


    // modal.removeAttribute('style');
    memoTitle.value = null;
    submitButton.removeAttribute('onclick');
    $('#staticBackdrop').hide()
}



function getMyStudy() {
    setStudyWrap()
    $('#card_info-like').html(``)

    const user_id = JSON.parse(localStorage.getItem('payload')).user_id

    $.ajax({
        type: "GET",
        url: `${hostUrl}/my_profile/${user_id}/study/`,
        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        success: function (response) {
            let like = response['serialize_like']
            let study = response['serialize_study']
            let apply = response['serialize_apply']

            console.log("serialize_like", like)
            console.log("serialize_study", study)
            console.log("serialize_apply", apply)

            //내가 등록한 스터디
            if (study.length > 0) {
                for (let i = 0; i < study.length; i++) {
                    let title = study[i]['title']
                    let user = study[i]["user"]
                    let content = study[i]['content']
                    let headcount = study[i]['headcount']
                    // let author = apply[i]['user']
                    let img = study[i]['thumbnail_img']
                    let tags = study[i]['tags']
                    let now_cnt = study[i]['now_cnt']
                    let id = study[i]['id']



                    let temp_html = `
                  <div class="mb-3 col-md-4 col-sm-6 p-2" style="cursor: pointer;">
                    <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${id})">
                        <img src="${hostUrl}${img}" type="button" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="text-start" style =" overflow-x : hidden;">
                                ${user}
                            </p>
                            <p>
                                <i class="fas fa-user-alt" style="color:tomato;"></i> ${now_cnt}/${headcount}
                            </p>
                                
                                <div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style="color : yellowgreen"></i> ${tags}</div>
                        </div>
                    </div>
                  </div>
                `
                    $('#card_info-study').append(temp_html)
                }
            }

            //내가 지원한 스터디
            if (apply.length > 0) {
                for (let i = 0; i < apply.length; i++) {
                    let title = apply[i]['title']
                    let content = apply[i]['content']
                    let headcount = apply[i]['headcount']
                    // let author = apply[i]['user']
                    let img = apply[i]['thumbnail_img']
                    let tags = apply[i]['tags']
                    let now_cnt = apply[i]['now_cnt']
                    let id = apply[i]['id']
                    let user = apply[i]["user"]

                    let temp_html = `
                    <div class="mb-3 col-md-4 col-sm-6 p-2" style="cursor: pointer;">
                    <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${id})">
                        <img src="${hostUrl}${img}" type="button" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="text-start" style =" overflow-x : hidden;">
                                ${user}
                            </p>
                            <p>
                                <i class="fas fa-user-alt" style="color:tomato;"></i> ${now_cnt}/${headcount}
                            </p>
                                
                                <div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style="color : yellowgreen"></i> ${tags}</div>
                        </div>
                    </div>
                  </div>
              `
                    $('#card_info-apply').append(temp_html)
                }
            }

            //내가 좋아한 스터디
            if (like.length > 0) {
                for (let i = 0; i < like.length; i++) {
                    let title = like[i]['title']
                    let content = like[i]['content']
                    let headcount = like[i]['headcount']
                    // let author = apply[i]['user']
                    let img = like[i]['thumbnail_img']
                    let tags = like[i]['tags']
                    let now_cnt = like[i]['now_cnt']
                    let id = like[i]['id']
                    let user = like[i]["user"]

                    let temp_html = `
                  <div class="mb-3 col-md-4 col-sm-6 p-2" style="cursor: pointer;">
                    <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${id})">
                        <img src="${hostUrl}/${img}" type="button" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="text-start" style =" overflow-x : hidden;">
                                ${user}
                            </p>
                            <p>
                                <i class="fas fa-user-alt" style="color:tomato;"></i> ${now_cnt}/${headcount}
                            </p>
                                
                                <div class = "text-start" style ="height : 30px; overflow-y : hidden;"><i class="fas fa-tags" style="color : yellowgreen"></i> ${tags}</div>
                        </div>
                    </div>
                  </div>
                `
                    $('#card_info-like').append(temp_html)
                }
            }
        }
    })

}

function setStudyWrap() {
    $('#main-wrap').empty()
    $('#staticBackdrop').empty()
    $('#main-wrap').html(`
    <div class="card-section">
      <div class="card-wrapper">
        <h3>내가 등록한 스터디</h3>
        <div class="row text-center" id="card_info-study">
          <!-- <div class="mb-3 col-md-4 col-sm-6 p-2"> -->
          <!-- card -->
        </div>
      </div>

      <!-- 내가 좋아요한 스터디 리스트 -->
      <div class="card-wrapper">
        <h3>내가 관심있는 스터디</h3>
        <div class="row text-center" id="card_info-like">
          <!-- card -->
        </div>
      </div>

      <!-- 내가 지원한 스터디 리스트 -->
      <div class="card-wrapper">
        <h3>내가 지원한 스터디</h3>
        <div class="row text-center" id="card_info-apply">
          <!-- card -->
        </div>
      </div>
    </div>
    `)
    $('#staticBackdrop').html(`
    <div class="modal-dialog modal-xl" style="border-radius: 10px; overflow: hidden;">
                    <div class="modal-content">
                        <div class="modal-body" style="padding: 0;">
                            <div id="modal-head" class="" style="height: 400px; ">

                                <div class="" style="align-self: end;">
                                    <b>
                                        <h3 id="study-title" class="text-start" style="color: white;"></h3>
                                    </b>
                                    <button id="status" style="height: 35px; font-size: 15px; margin-right: 10px;"
                                        type="button" class="btn btn-primary">Understood</button>
                                    <i class="fas fa-user-alt" style="font-size: 25px; color : white;"></i>
                                    <span id="study-ratio" class="p-1"
                                        style="color: white; border: 1px solid white; border-radius: 20%; margin-right: 10px;"></span>
                                    <span style="cursor: pointer;" id="study-like"><i id="star"
                                            style="color : yellow; font-size : 25px"></i></span>
                                    <!-- <span style="color: white;">태그들 있을 예정</span> -->
                                </div>
                                <i class="fas fa-times text-end" data-bs-dismiss="modal" aria-label="Close"
                                    style="margin-left: auto; cursor: pointer; color: rgb(255, 255, 255); font-size: 30px;"></i>
                            </div>
                        </div>
                        <div class="modal-footer" style="display: block; text-align: left;">
                            <div class="mb-4" style="padding: 5px 15px">
                                <h5 id="author" class="text-secondary mb-3"></h5>
                                <span class="mb-1" style="font-size: 20px; font-weight : 500;">모집 내용</span>
                                <div id="content" class="mb-3"
                                    style="border-radius: 15px; border: 2px solid black; padding: 15px;">

                                </div>
                                <div id="study-tags">

                                </div>
                                <div id="student_list">

                                </div>
                            </div>


                            <div>
                                <img width="40px" src="/static/images/stady_bear_face.png" alt="">
                                <span
                                    style="height: 25px; padding: 3px ;font-size: 20px; border-radius : 12.5px; background-color: antiquewhite;"
                                    class="text-center">
                                    테디가 분석해 봤어요. 어떤가요~?
                                </span>
                            </div>
                            <div id="recommend-wrap" class="row"
                                style="background-color: #00b395; border-radius: 10px; padding: 10px;">
                            </div>
                        </div>

                    </div>
                </div>
    `)
}

function setStudyLogWrap() {
    $('#main-wrap').empty()
    $('#staticBackdrop').empty()
    $('#main-wrap').html(`
    <div class="log-wrap row" style="max-height: 800px;">
        <div class="col-4 px-0">
          <div id="study_day"
            style="margin-right:10px; background-color: #1d7d78; color: white; min-height: 130px; border-radius: 10px ">
            <h5>날짜</h5>
            <!-- 하루하루 날짜 데이터 -->
          </div>
        </div>
        <div class="col-8" style="background-color: white; border-radius: 10px;">
          <h5>날짜</h5>
          <span id="total"></span><br />
          <div id="study_log"></div>
          <!-- 공부로그 데이터  -->
        </div>
      </div>
    </div>
    `)

    $('#staticBackdrop').html(`
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Memo</h1>
            <button type="button" onclick="closeMemo()" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5>어떤 걸 공부하셨나요??</h5>
            <input type="text" id="memo-title">
          </div>
          <div class="modal-footer">

            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="memo-submin-btn">저장</button>
          </div>
        </div>
      </div>
    `)


}