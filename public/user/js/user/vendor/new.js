let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form#generate").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            amount: e.currentTarget.querySelector("select#package").value,
            quantity: e.currentTarget.querySelector("input#quantity").value,
        };

        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", "reload", true)
        
    })
})