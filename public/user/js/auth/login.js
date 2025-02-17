let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form#login").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            credentials: e.currentTarget.querySelector("input#credentials").value,
            password: e.currentTarget.querySelector("input#password").value,
            logged: e.currentTarget.querySelector("input#remember-check").checked
        };

        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", undefined, true)
        
    })
})