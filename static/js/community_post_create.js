$('#post_create').click( function() {
    post_create()
    });

    function post_create() {
        let content = $("#content").val()
        let category = $("select[name=category]").val()
        let title = $("#title").val()
        let formData = new FormData();

        formData.append("content", content)
        formData.append("category", category)
        formData.append("title", title)
        // formData.append("img",document.getElementById("img").files[0]);
        // console.log(document.getElementById("img").files[0]);
        const formFile = $("#img")[0];
        if (formFile.files.length === 0) {
          console.log('hi')
        } else {
          formData.append("img", formFile.files[0]);
        }
        console.log("제목",title)
        console.log("내용",content)
        console.log("폼데이터",formData)
        console.log("카테고리",category)
    
        $.ajax({
    
            type: "POST",
            url: "http://127.0.0.1:8000/community/category/",
            processData: false,
            contentType: false,
            data: formData,
    
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("access"),
            },
    
            success: function (result) {
            alert("작성완료", result);
            location.href='index.html'
            },
            error : function(request, status, error){
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
            
            }
          );
    }

