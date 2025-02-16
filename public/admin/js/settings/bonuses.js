let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    //Submit Form
    document.querySelectorAll("form#bonus").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                b_register_bonus: e.currentTarget.querySelector("input#register").value,
                b_share_bonus: e.currentTarget.querySelector("input#sponsored").value
            };

        
            submit = e.currentTarget.querySelector("button");
            fetchResourse(obj,window.location.href,"PUT","reload")
        })
    })
})