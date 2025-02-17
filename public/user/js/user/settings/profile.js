let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //PROFILE
    document.querySelector("form#basic").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            fullname: e.currentTarget.querySelector("input#fullname").value,
            email: e.currentTarget.querySelector("input#email").value,
            phone_number: e.currentTarget.querySelector("input#phone").value,
            country: e.currentTarget.querySelector("select#country").value

        };


        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "PUT", "reload",true)
    });

    //AVATAR
    document.querySelector("form#avatar").addEventListener("submit", e => {
        e.preventDefault();

        const obj3 = new FormData();
        obj3.append("avatar", e.currentTarget.querySelector("input#avatar").files[0])
        
        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj3, window.location.href, "PUT", "reload", false)
        
        
    });


    document.querySelectorAll("input#avatar").forEach(input => {
    input.addEventListener("change", e => {
        
        let file = e.currentTarget.files[0];
        
        document.querySelector(`img#${e.currentTarget.name}`).src = URL.createObjectURL(file)

    })
    })
    
})