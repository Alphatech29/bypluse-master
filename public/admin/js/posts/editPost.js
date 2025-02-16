


$('#summernote').summernote({
        placeholder: 'Write Here',
        tabsize: 2,
        height: 320,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview', 'help']]
        ]
});



document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;
    
    //Slug
    document.querySelectorAll("input#title").forEach(input => {
        input.addEventListener("keyup", press => {
        press.target.parentElement.parentElement.querySelector("input#slug").value = makeSlug(press.target.value)
        });
        
    })
    
  
    

    //EDIT POST
    try {
        
        document.querySelector("form#editPost").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            post_title: e.currentTarget.querySelector("input#title").value,
            post_slug: e.currentTarget.querySelector("input#slug").value,
            post_earnable: e.currentTarget.querySelector("input#earnable").checked ? 1 : 0,
            post_description: e.currentTarget.querySelector("textarea#summernote").value
        };

    

        

        
        submit = e.currentTarget.querySelector("button#button")      
        loadingState(submit, true);

        fetch(document.location.href, {
                    method: "PUT",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(filterEmptyObj(obj))
                })
                    .then(res => res.json())
            .then(res => {
                        
                loadingState(submit, false);
                        
                        if (res.status) {
                            if (document.querySelector("input#featured").files.length > 0) {
                                loadingState(submit, true);

                                let file = new FormData();
                                file.append("image", document.querySelector("input#featured").files[0])
                                
                                
                                
                                fetch(window.location.href + `?slug=${res.slug}`, {
                                    method: "PUT",
                                    credentials: "include",
                                    mode: "cors",
                                    body: file
                                    
                                }).then(res => res.json())
                                    .then(res => {
                                        loadingState(submit, false);
                                        if (res.status) {
                                            swal({
                                            title: res.message,
                                            icon: "success"
                                        }).then(() => window.location.reload())
                                        } else {
                                            loadingState(submit, false);
                                            swal({
                                            title: res.message,
                                            icon: "error"
                                        })
                                        }
                        
                                            
                                    })
                                
                                
                            } else {
                                swal({
                            title: res.message,
                            icon:"success"
                    }).then(() => window.location.reload())
                            }
                        } else {
                            loadingState(submit, false);
                            swal({
                            title: res.message,
                            icon:"error"
                    })
                        }
                    }).catch(err => {
                        
                    swal({
                        title: err.message,
                        icon: "error"
                    })
                    })
        });
        
    } catch (error) {
        
    }
    
    //Featured Image Preview
    document.querySelector("input#featured").addEventListener("change", e => {
        let file = e.currentTarget.files[0];
        const img = document.querySelector("img#featured");
        img.src = URL.createObjectURL(file);
        console.log(img.parentElement)
        img.parentElement.style.display = "block"
    });


    function makeSlug(text) {
        return text.toLowerCase().replace(/[^A-Za-z0-9 ]/gi," ").trim().split(" ").filter(t => t !== "").join("-")
    }

    function filterEmptyObj(obj) {
    return Object.fromEntries(Object.entries(obj).filter(v => v[1] !== ""));
    }


})