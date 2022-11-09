const hostUrl = 'http://127.0.0.1:8000'

$(document).ready(function () {
    load_json()
});
function load_json() {
    const user_id = JSON.parse(localStorage.getItem('payload')).user_id

    $.ajax({
        type: "GET",
        url: `${hostUrl}/my_profile/${user_id}/study/`,
        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        success: function (response) {
            console.log("dddddd")
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
                    let user = study[i]["user"]

                    let temp_html = `
                    <div class="mb-3 col-md-3 col-sm-6 p-4 card">
                    <div class="" style="background-color: white; border-radius : 5px">
                        <a href="#">
                            <img src="${hostUrl}/${img}" type="button" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text text-second">
                                    모집내용 : ${content}</br>
                                    모집인원 : ${headcount}</br>
                                </p>
                            </div>
                        </a>
                    </div>
                  </div>
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
                    let user = study[i]["user"]

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