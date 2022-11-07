
//날짜 변수
const date = new Date()
const todayDate = document.getElementById('today-date')
const td = date.toLocaleDateString('ko-kr').slice(0,-1).replaceAll('. ', '-')

const todayLog = document.getElementById('today-log');

// 종료 플래그
var is_running = false

// 비디오 변수
var video = document.getElementById('video');
var localstream;
var video = document.getElementById('video');

// 캔버스 뱐수 & 설정
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


document.addEventListener("DOMContentLoaded", function(){
    todayDate.innerText = td
});
$( document ).ready(function() {
    getLog(td)
});


function uploadImage() {
    console.log('uploading')
    context.drawImage(video, 0, 0, 960, 720);
    var drawCanvas = document.getElementById('canvas');

    if(is_running === true){
        $.ajax({
        type: 'POST',

        data: { imgUpload: drawCanvas.toDataURL('image/png') }, // 이미지를 인코딩

        url: 'http://127.0.0.1:8000/api/study/',
        headers : {
            "Authorization" : "Bearer " + localStorage.getItem("access"),
        },

        success: function (result) { // 결과 값에 사람이 있고 없음을 판단
            console.log(result)
            if(is_running === false){ // 만약 사람이 있어서 백엔드에서 새로운 공부로그를 만들었다. 하지만 그 사이에 종료 버튼을 눌러서 is_running플래그가 false라면 새로운 공부 로그를 지워야하는 경우
                console.log(result, '콜백 실행돼야해!!!!!!!!!');

                $.ajax({ // 새로운 공부 로그가 만들어지면 안되기 때문에 다시 콜백에 요청을 한다.
                    type: 'DELETE',

                    data: {},

                    url: 'http://127.0.0.1:8000/api/study/', // 최근 새로운 공부 로그를 없애주는 함수를 실행

                    success: function (result){
                        insertLog(result)
                    }
                })
            }else{
                insertLog(result)

            }
        },
    });
    }else{
        clearInterval(root);
    }
        
}


function insertLog(result){
    let logList = result['study_log_list']
    let dayTotalTime = result['day_total_time']

    if (logList){
        let totalTemp = '';
        for (let i = 0; i < logList.length; i++) {
            let temp = `
            
            <div class="row mb-2">
                <div class="col-4">${logList[i]["start_time"]} ~ ${logList[i]["end_time"]}(${logList[i]['sub_time']}분)</div>
                <div class="col-8 row">
                    <div class="col-8" id="memo-${logList[i]["id"]}">${logList[i]["memo"]}</div>
                    <div class=" col-4 text-end">
                        <button onclick="writeMemo(${logList[i]["id"]})" type="button" class="btn btn-success" style="font-size : 12px;"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            메모/수정
                        </button>

                    </div>
                </div>
            </div>
            `;
            totalTemp += temp;
        }
        $('#today-log').empty();
        $('#today-log').append(totalTemp);

        $('#day-total-time').text(dayTotalTime);
    }
}



function startStudy() {

    $.ajax({
        type: 'GET',

        data: {},
        headers : {
            "Authorization" : "Bearer " + localStorage.getItem("access"),
        },
        url: 'http://127.0.0.1:8000/api/study/?type=start',

        success: function (result) {
            console.log('성공:', result);
            insertLog(result)

        },
    });
}

function finishStudy() {

    $.ajax({
        type: 'GET',

        data: {},
        headers : {
            "Authorization" : "Bearer " + localStorage.getItem("access"),
        },
        url: 'http://127.0.0.1:8000/api/study/?type=finish',

        success: function (result) {
            console.log('finishStudy()');
            insertLog(result)
        },
    });
}

function writeMemo(logId) {
    let modal = document.getElementById('staticBackdrop');
    let submitButton = document.getElementById('memo-submin-btn');
    let memo = document.getElementById(`memo-${logId}`);
    let memoTitle = document.getElementById('memo-title');

    $('#staticBackdrop').modal('show')

    submitButton.setAttribute('onclick', `submitMemo(${logId})`)
    memoTitle.value = memo.innerText;
}

function submitMemo(logId) {
    var memoTitle = document.getElementById('memo-title').value; // 모달 인풋 값에 입력한 값
    var memo = document.getElementById(`memo-${logId}`); // 공부 로그에 남긴 메모
    console.log(memoTitle, memo)

    $.ajax({
        type: 'PUT',

        data: { memoTitle: memoTitle, logId: logId },
        headers : {
            "Authorization" : "Bearer " + localStorage.getItem("access"),
        },
        url: 'http://127.0.0.1:8000/api/study/',

        success: function (result) {
            console.log('성공:', result);
            memo.innerText = ''; // 텍스트 지우기
            memo.append(memoTitle);

        }
    });

    closeMemo()
}

function closeMemo() {
    let modal = document.getElementById('staticBackdrop');
    let memoTitle = document.getElementById('memo-title');
    let submitButton = document.getElementById('memo-submin-btn');

    // modal.removeAttribute('style');
    memoTitle.value = null;
    submitButton.removeAttribute('onclick');
}

function pushStartBtn() {
    if (is_running === false){
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
                localstream = stream;
                video.play();
            });
        }
        startStudy();
        root = setInterval(uploadImage, 5000); // 반복 시키는 함수
        is_running = true // 플래그 
    }
}
function pushFinishBtn() {
    is_running = false
    console.log('pushFinishBtn() 확인');
    clearInterval(root);
    setTimeout(finishStudy, 0); //이미지 처리 전 코드 실행 방지
    video.pause();
    video.src = '';
    localstream.getTracks()[0].stop();
}

function getLog(day){

    $.ajax({
        type: 'GET',

        data: {day:day},
        headers : {
            "Authorization" : "Bearer " + localStorage.getItem("access"),
        },

        url: 'http://127.0.0.1:8000/api/study/log/',

        success: function (result) {
            insertLog(result)
            console.log('getLog()', result);
            insertLog(result)

        },

        error : function(request){
            if (request.status === 401){
                alert('로그인 필요')
                window.location.href = "/user/login.html"
            }
        }
    });
    todayDate.innerText = ``;
    todayDate.append(day)
}