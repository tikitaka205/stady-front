
$( document ).ready(function() {
    console.log("접속")
    study_log()
});





function day_log(date){ 
    $('#study_log').empty()
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/my_profile/daylog/"+date+"/",
        headers : {
            "Authorization" : "Bearer " + localStorage.getItem("access"),
            },
        data: {},
        success: function (response) {
            let log = response
            for(let i = 0 ; i < log.length; i++){
                let start_time = log[i]['start_time']
                let end_time = log[i]['end_time']
                let memo = log[i]['memo']
                let sub_time = log[i]['sub_time']
                console.log('실행되니?')
                // let date = log[i]['date']

                let temp_html = `
                <div id="today-log" style="max-height: 800px; overflow-y : scroll; ">
                <div class="row mb-2">
                  <div class="col-4">${start_time} ~ ${end_time}(${sub_time}분)</div>
                  <div class="col-8 row">
                    <div class="col-8" id="memo-{{log.id}}"">${memo}</div>
                      <div class=" col-4 text-end">
                          <button onclick="writeMemo(${log.id})" type="button" class="btn btn-success" style="font-size : 12px;"
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
                
        }
})
}


function study_log(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/my_profile/studylog/",
        headers : {
            "Authorization" : "Bearer " + localStorage.getItem("access"),
            },
        data: {},
        success: function (response) {
            let log = response['log']
            
            date_arr =[]
        
            for (let i =0 ; i < log.length; i++){
                let date = log[i]['date']
                date_arr.push(date) 
            }
            
            let date = [...new Set(date_arr)];
            console.log(date)

            for (let i = 0 ; i < date.length; i++){
                let day = date[i]
                
                let temp_html = `
                    <div>
                    <a href ="#" onclick="day_log('${day}')">${day}</a>
                    </div> 
                `
                    $('#study_day').append(temp_html)
                }

            for(let i = 0 ; i < log.length; i++){
                let start_time = log[i]['start_time']
                let end_time = log[i]['end_time']
                let memo = log[i]['memo']
                let sub_time = log[i]['sub_time']
                // let date = log[i]['date']

                let temp_html = `
                <div id="today-log" style="max-height: 800px; overflow-y : scroll; ">
                <div class="row mb-2">
                  <div class="col-4">${start_time} ~ ${end_time}(${sub_time}분)</div>
                  <div class="col-8 row">
                    <div class="col-8" id="memo-{{log.id}}"">${memo}</div>
                      <div class=" col-4 text-end">
                          <button onclick="writeMemo(${log.id})" type="button" class="btn btn-success" style="font-size : 12px;"
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

    $('#staticBackdrop').modal('show')

    // modal.setAttribute('class', 'modal fade show');
    // modal.removeAttribute('style');
}

function submitMemo(logId) {
    console.log('submitmemo function')
    var memoTitle = document.getElementById('memo-title').value; // 모달 인풋 값에 입력한 값
    var memo = document.getElementById(`memo-${logId}`); // 공부 로그에 남긴 메모
    console.log(memoTitle, memo)

    $.ajax({
        type: 'POST',

        data: { memoTitle: memoTitle, logId: logId },

        url: '/study/memo/',

        success: function (result) {
            console.log('성공:', result);
            memo.innerText = ''; // 텍스트 지우기
            memo.append(memoTitle);

        }
    });

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