
$( document ).ready(function() {
    console.log("접속")
    study_log()
});


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
            
            // console.log(date_arr)
            let date = [...new Set(date_arr)];
            console.log(date)

            for (let i = 0 ; i < date.length; i++){
                let day = date[i]
                console.log(date)
                let temp_html = `
                    <h5>날짜</h5>
                    <div>
                    ${day}
                    </div> 
                `
                    $('#study_day').append(temp_html)
                }

            for(let i = 0 ; i < log.length; i++){
                let start_time = log[i]['start_time']
                let end_time = log[i]['end_time']
                let memo = log[i]['memo']
                let sub_time = log[i]['sub_time']
                let date = log[i]['date']

                let temp_html = `
                <h5 id="today-date">${date}</h5>
                <div id="today-log" style="max-height: 800px; overflow-y : scroll; ">
                
                <div class="row mb-2">
                  <div class="col-4">${start_time} ~ ${end_time}(${sub_time}분)</div>
                  <div class="col-8 row">
                    <div class="col-8" id="memo-{{log.id}}"">${memo}</div>
                      <div class=" col-4 text-end">
                          <button onclick="writeMemo({log.id}})" type="button" class="btn btn-success" style="font-size : 12px;"
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

// // <div id="study-day-list" style="background-color: #1d7d78; color: white; min-height: 130px; overflow-y : scroll; border-radius: 10px">
// <h5>날짜</h4>
// <div onclick="getLog(`{{day}}`)">
//   {{day}}
// </div>
// {% endfor %}
// </div> 

{/* <h5 id="today-date">{{date}}</h5>
<div id="today-log" style="max-height: 800px; overflow-y : scroll; ">

<div class="row mb-2">
  <div class="col-4">{{log.start_time}} ~ {{log.end_time}}({{log.sub_time}}분)</div>
  <div class="col-8 row">
      <div class="col-8" id="memo-{{log.id}}"">{{log.memo}}</div>
      <div class=" col-4 text-end">
          <button onclick="writeMemo(`{{log.id}}`)" type="button" class="btn btn-success" style="font-size : 12px;"
              data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              메모/수정
          </button>
      </div>
  </div>
</div>

</div>  */}