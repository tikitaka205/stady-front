

$( document ).ready(function() {
    load_json()
});
function load_json(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/my_profile/3/study/",
        data: {},
        success: function (response) {
            
            let like = response['serialize_like']
            let study = response['serialize_study']
            let apply = response['serialize_apply']

            //내가 등록한 스터디
            if (study.length > 0 ){
                for (let i = 0 ; i < study.length; i++){
                    let title=  study[i]['title']
                    let content = study[i]['content']
                    let headcount = study[i]['headcount']
                    // let author = apply[i]['user']
                    let img = study[i]['thumbnail_img']

                    let temp_html = `
                    <div class="mb-3 col-md-3 col-sm-6 p-4 card">
                    <div class="" style="background-color: white; border-radius : 5px">
                        <a href="#">
                            <img src="http://127.0.0.1:8000${img}" type="button" class="card-img-top" alt="...">
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
                `
                $('#card_info-study').append(temp_html)
                }
            } 

            //내가 지원한 스터디
            if (apply.length > 0 ){
                for (let i = 0 ; i < apply.length; i++){
                    let title=  apply[i]['title']
                    let content = apply[i]['content']
                    let headcount = apply[i]['headcount']
                    // let author = apply[i]['user']
                    let img = apply[i]['thumbnail_img']

                    let temp_html = `
                    <div class="mb-3 col-md-3 col-sm-6 p-4 card">
                    <div class="" style="background-color: white; border-radius : 5px">
                        <a href="#">
                            <img src="http://127.0.0.1:8000${img}" type="button" class="card-img-top" alt="...">
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
                `
                $('#card_info-apply').append(temp_html)
                }
            } 

            //내가 좋아한 스터디
            if (like.length > 0 ){
                for (let i = 0 ; i < like.length; i++){
                    let title=  like[i]['title']
                    let content = like[i]['content']
                    let headcount = like[i]['headcount']
                    // let author = apply[i]['user']
                    let img = like[i]['thumbnail_img']

                    let temp_html = `
                    <div class="mb-3 col-md-3 col-sm-6 p-4 card">
                    <div class="" style="background-color: white; border-radius : 5px">
                        <a href="#">
                            <img src="http://127.0.0.1:8000${img}" type="button" class="card-img-top" alt="...">
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
                `
                $('#card_info-like').append(temp_html)
                }
            }   
        }
    })

}
   