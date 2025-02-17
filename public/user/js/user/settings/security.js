let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //PROFILE
    document.querySelector("form#security").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            password: e.currentTarget.querySelector("input#password").value,
            currentPassword: e.currentTarget.querySelector("input#current").value
        };

        
        const password2 = e.currentTarget.querySelector("input#password2").value
        
        if (obj.password !== password2) {
            return cuteAlert({
                    type: "error",
                    title: "New Password Mismatched",
                    message: '',
                    buttonText: "Okay, I Understood"
                    })
        }


        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "PUT", "reload",true)
    });

})