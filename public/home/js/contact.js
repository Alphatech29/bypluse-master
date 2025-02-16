
let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    

    document.querySelector("form#contact").addEventListener("submit", e => {
        e.preventDefault();

        const obj = {
            message: e.currentTarget.querySelector("textarea#message").value,
            name: e.currentTarget.querySelector("input#name").value,
            email: e.currentTarget.querySelector("input#email").value,
            subject: e.currentTarget.querySelector("input#subject").value
        }

        if (Object.values(obj).some(i => i === "")) {
                cuteAlert({
                    type: "error",
                    title: "Some Fields Cannot Be Empty",
                    message: "Fill all required fields",
                    buttonText: "Okay"
                });
            
            return
        } else {
            
            submit = e.currentTarget.querySelector("button#submit");
            fetchResourse(obj, window.location.href, "POST","reload",true)
            
        }
    })


})