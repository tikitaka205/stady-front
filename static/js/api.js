const backend_base_url = 'http://127.0.0.1:8000';
const frontend_base_url = 'http://127.0.0.1:5500';


// window.onload = loadStudyView()


async function getStudyView() {
    const response = await fetch(`${backend_base_url}/studies/`, {
        method: 'GET',
    })
    const response_json = await response.json()
    // console.log(response_json)
    return response_json
}

async function loadStudyView() {
    const studies = await getStudyView()
    const study_list = document.getElementById('study_view')

    console.log("lastprint:", (studies))
    studies.forEach(study => {
        console.log(study.id)
        const study_item = document.createElement('div')
        study_item.className = "mb-3 col-md-4 col-sm-6 p-2";
        study_item.style = "cursor: pointer";
        study_item.innerHTML = `
                <div id="study" style="background-color: white; border-radius : 5px" onclick="viewStudy(${study.id})">    
                    <img src="${backend_base_url}${study.thumbnail_img}" type="button" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${study.title}</h5>
                        <p class="card-text text-second">
                            작성자 : ${study.user}</br>
                            모집내용 : ${study.content}</br>
                            모집내용 대신 태그를 달?</br>
                            모집인원 : ${study.headcount}</br>
                        </p>
                    </div>
                </div>
        `
        study_list.appendChild(study_item)

        console.log(study)

    });

}



async function getStudyDetailView(study_id) {
    // window.location.href = '/study_detail.html'
    console.log(typeof (study_id))
    const response = await fetch(`${backend_base_url}/studies/${study_id}/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "GET",
    });
    console.log("확인3", response)
    const response_json = await response.json()
    console.log("확인4")
    console.log(response_json)
    return response_json
}

async function loadStudyDetailView(study_id) {
    console.log("확인")
    const study_post = await getStudyDetailView(study_id);
    console.log("확인5")

    // const study_post_content = document.getElementById("study_view")
    // study_post_content.innerText = `
    //     test 페이지
    // `
    const study_post_content = document.getElementById("study_view")
    study_post_content.innerHTML = `
    {% extends 'base.html' %}

    {% block content %}
    <img width="100%" src="{{study_post.thumbnail_img.url}}" alt="">
        <h1>${study_post.title}</h1>
        <div>
            ${study_post.content}
        </div>

        <form action="${backend_base_url}/studies/like/${study_post.pk}" method='POST'>
            {% if user in study_post.like.all %}
            <button class="btn btn-link text-danger">
                <img width="30px" height="30px" src="/static/images/star (1).png">
            </button>
            {% else %}
            <button class="btn btn-link text-danger">
                <img width="30px" height="30px" src="/static/images/star (2).png">
            </button>
            {% endif %}
            ${study_post.now_cnt}/${study_post.limit_cnt}
        </form>

        <div>
            {% if is_author %}
            <button>삭제하기는 아직</button>
            {% else %}
            <form action="${backend_base_url}/studies/${study_post.id}/submit/" method='POST'>
                {% csrf_token %}
                {% if sended %}
                <input onclick="return confirm('신청취소 하시겠습니까?');" type="submit" value='신청 취소'>
                    {% else %}
                    <input onclick="return confirm('신청 하시겠습니까?');" type="submit" value='신청'>
                        {% endif %}
                    </form>
                </div>
                {% endif %}




                {% if is_author %}

                {% elif is_student %}
                <form action="${backend_base_url}/studies/${study_post.id}/delete/${study_post.user.id}" method="post">
                    {% csrf_token %}
                    <button>탈퇴하기</button>
                </form>
                {% elif sended %}
                <form action="{% url 'studies:delete_student' study_id=study_post.id user_id=user.id %}" method="post">
                    {% csrf_token %}
                    <button>요청 취소</button>
                </form>
                {% else %}
                <form method="post">
                    {% csrf_token %}
                    <input type="submit" value="모임 참가신청">
                </form>
                {% endif %}




                {% if is_author %}

                멤바들
                {% for member in member_list %}
                {{ member }}
                {% endfor %}

                <div>
                    {% for student in student_list %}
                    이름: {{ student.username }}
                    유저_id: {{ student.id }}
                    승인여부:
                    {% if student.is_accept == 1 %}
                    승인된 유저
                    {% elif student.is_accept == None %}

                    <form action="{% url 'studies:choice' study_id=study_post.id user_id=student.id %}" method="post">
                        {% csrf_token %}
                        <input type="text" name="is_choice" value='1' style="display: none">
                            <button>승낙</button>
                    </form>
                    <form action="{% url 'studies:delete_student' study_id=study_post.id user_id=student.id %}" method="post">
                        {% csrf_token %}
                        <button>거절</button>
                    </form>
                    {% endif %}
                    <br>
                        {% endfor %}
                </div>
                {% else %}

                <div>
                    작성자: {{ study_post.user }}<br>
                    제목: {{ study_post.title }}<br>
                    내용: {{ study_post.content }}<br>
                    썸네일: {{ study_post.thumbnail_img }}<br>
                </div>
    `
}

async function createPost() {
    window.location.href = "/study_group/create.html"
    // const create_post = document.getElementById('study_view')
    // create_post.innerHTML = `
    //     <div>
    //         <form>
    //             <input type="text" id="title" name="title"/>
    //             <textarea id="content" name="content"></textarea>
    //             <input type="text" id="headcount" name="headcount"/>
    //             <input type="text" id="tags" name="tags"/>
    //             <button type="button" onclick="postCreatePost()">모집하기</button>
    //         </form>
    //     </div>
    // `
}

async function postCreatePost() {
    console.log("post 시작")
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const headcount = document.getElementById('headcount').value
    const tags = document.getElementById('tags').value

    const response = await fetch(`${backend_base_url}/studies/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: JSON.stringify({
            "title": title,
            "content": content,
            "headcount": headcount,
            "tags": tags
        }),
    });
    window.location.reload()
}