window.onload = function(){
    post_list()
}

post_list = () =>{
    $.ajax({
        type: "GET",

        url: `http://127.0.0.1:8000/blind/`,

        data: {},
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        success: function (response) {
            console.log(response)
            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    let id = response[i]['id']

                    console.log(id)
                    let title = response[i]['title']
                    let hits =response[i]['hits']
                    let created_at = response[i]['created_date']
                    let category = response[i]['category']
                    let user = response[i]['user']

                    temp_html=` <tr>
                    <td>${id}</td>
                    <td>
                        <onclick=q(${id})>${title}</a>

                    </td>
                    <td>${category}</td>
                    <td>${hits}</td>
                    <td>${user}</td>
                    <td>${created_at}</td>
                </tr>`
                $('#post_list').append(temp_html)
                }

            }
        }
    })
}

$('#free_list').click( function() {
    free_list()
});
function free_list() {
    let category = '자유게시판' ;
    console.log(category)
    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/blind/category/?category=${category}`,
        data: {},

        headers: {
          "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
        $('#post_list').empty()

        console.log('성공:', response);
        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                let id = response[i]['id']

                console.log(id)
                let title = response[i]['title']
                let hits =response[i]['hits']
                let created_at = response[i]['created_date']
                let category = response[i]['category']
                let user = response[i]['user']

                temp_html=` <tr>
                <td>${id}</td>
                <td>
                    <onclick=q(${id})>${title}</a>
                </td>
                <td>${category}</td>
                <td>${hits}</td>
                <td>${user}</td>
                <td>${created_at}</td>
            </tr>`
            $('#post_list').append(temp_html)
        }
        }


        }

      });
}



$('#blind_list').click( function() {
    blind_list()
});
function blind_list() {
    let category = 'blind' ;
    console.log(category)
    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/blind/category/?category=${category}`,
        data: {},

        headers: {
          "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
        $('#post_list').empty()

        console.log('성공:', response);
        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                let id = response[i]['id']

                console.log(id)
                let title = response[i]['title']
                let hits =response[i]['hits']
                let created_at = response[i]['created_date']
                let category = response[i]['category']
                let user = response[i]['user']

                temp_html=` <tr>
                <td>${id}</td>
                <td>
                    <onclick=q(${id})>${title}</a>
                </td>
                <td>${category}</td>
                <td>${hits}</td>
                <td>${user}</td>
                <td>${created_at}</td>
            </tr>`
            $('#post_list').append(temp_html)
        }
        }


        }

      });
}

$('#study_list').click( function() {
    study_list()
});
function study_list() {
    $('#post_list').empty()

    let category = 'study' ;
    console.log(category)
    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/blind/category/?category=${category}`,
        data: {},

        headers: {
          "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
        console.log('성공:', response);
        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                let id = response[i]['id']

                console.log(id)
                let title = response[i]['title']
                let hits =response[i]['hits']
                let created_at = response[i]['created_date']
                let category = response[i]['category']
                let user = response[i]['user']

                temp_html=` <tr>
                <td>${id}</td>
                <td>
                    <onclick=q(${id})>${title}</a>
                </td>
                <td>${category}</td>
                <td>${hits}</td>
                <td>${user}</td>
                <td>${created_at}</td>
            </tr>`
            $('#post_list').append(temp_html)
        }
        }


        }

      });
}


$('#top_list').click( function() {
    top_list()
});
function top_list() {

    $.ajax({

        type: "GET",
        url: `http://127.0.0.1:8000/blind/`,
        data: {},

        headers: {
          "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
            console.log(response)
            $('#post_list').empty()

            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    let id = response[i]['id']

                    console.log(id)
                    let title = response[i]['title']
                    let hits =response[i]['hits']
                    let created_at = response[i]['created_date']
                    let category = response[i]['category']
                    let user = response[i]['user']

                    temp_html=` <tr>
                    <td>${id}</td>
                    <td>

                        <a href="http://127.0.0.1:5500/stady-front/community/post_detail.html?id=${id}">${title}</a>

                    </td>
                    <td>${category}</td>
                    <td>${hits}</td>
                    <td>${user}</td>
                    <td>${created_at}</td>
                </tr>`
                
                $('#post_list').append(temp_html)


                }

            }
        }
    })
}



