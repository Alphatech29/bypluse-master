let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            credentials: e.currentTarget.querySelector("input#credentials").value
        };

        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", "nothing", true)
        
    })
})