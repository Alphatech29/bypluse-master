
let submit, cbText;

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
    
    //Slug
    document.querySelectorAll("input#title").forEach(input => {
        input.addEventListener("keyup", press => {
        press.target.parentElement.parentElement.querySelector("input#slug").value = makeSlug(press.target.value)
        });
        
    })

    document.querySelectorAll("form#editPage").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                page_title: e.currentTarget.parentElement.querySelector("input#title").value,
                page_slug: e.currentTarget.parentElement.querySelector("input#slug").value,
                page_description: e.currentTarget.parentElement.querySelector("textarea#summernote").value,
                page_status: e.currentTarget.parentElement.querySelector("input[type=checkbox]").checked ? 1 : 0
            };

            const id = e.currentTarget.parentElement.querySelector("input#id").value;

            
            submit = e.currentTarget.parentElement.querySelector("button#button");
            fetchResourse(obj,`${window.location.href}?id=${id}`,"PUT","reload")
        });
        
    })

    

    //CREATE NEW POST
    try {
        
        document.querySelector("form#newPost").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            post_title: e.currentTarget.querySelector("input#title").value,
            post_slug: e.currentTarget.querySelector("input#slug").value,
            post_description: e.currentTarget.querySelector("textarea#summernote").value
        };

    

        

        
        submit = e.currentTarget.querySelector("button#button")
              
        loadingState(submit, true);

        fetch(document.location.href, {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(obj)
                })
                    .then(res => res.json())
            .then(res => {
                        
                loadingState(submit, false);
                        
                        if (res.status) {
                            if (document.querySelector("input#featured").files.length > 0) {
                                loadingState(submit, true);

                                let file = new FormData();
                                file.append("image", document.querySelector("input#featured").files[0])
                                
                                
                                
                                fetch(window.location.href + `?id=${res.id}&slug=${res.slug}`, {
                                    method: "POST",
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
    

    //DELETE POST
    window.deletePost = function (postId, btn) {
        
        submit = btn;

            swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse({}, `${window.location.href}?id=${postId}`, "DELETE", "reload")
                }
            })
        
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



})