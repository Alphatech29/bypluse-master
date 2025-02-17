let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("form#change").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            password: e.currentTarget.querySelector("input#password").value
        };
        
        const password2 = e.currentTarget.querySelector("input#password2").value;
        
        if(obj.password !== password2){
            return cuteAlert({
                type: "error",
                title: "Password Not Matched",
                message:"",
                buttonText: "Okay"
            })
        }
        
        
            

        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", undefined, true)
        
    })
    
})