let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form#withdraw").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            type: e.currentTarget.querySelector("select#type").value
        };

        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", undefined, true)
        
    })
})