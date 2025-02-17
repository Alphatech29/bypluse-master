let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form#verify").addEventListener("submit", e => {
        e.preventDefault();

        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(undefined, "/verification", "GET", "nothing", true)
        
    })
});