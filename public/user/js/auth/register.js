let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    //Upline Searcher
    document.querySelector("input#upline").addEventListener("change", e => {
        if(!e.target.value){
            return
        };

        const upline = document.querySelector("input#upline");

        fetch(`/register/search?upline=${e.target.value}`, {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (!res.status) {
                    cuteAlert({
                        type: "error",
                        title: "Upline not found",
                        message: 'Maybe you misspelt the username or no user bear such name!',
                        buttonText: "Okay"
                    })
                    return upline.value = ""
                } else {

                    cuteAlert({
                        type: "success",
                        title: "Upline was found",
                        message: "",
                        buttonText: "Okay"
                    })

                    return upline.value = res.upline.toLocaleUpperCase()
                }
            })
        
    });

    //SUBMIT FORM
    document.querySelector("form#register").addEventListener("submit", e => {
        e.preventDefault();
       
        const obj = {
            username: e.currentTarget.querySelector("input#username").value,
            fullname: e.currentTarget.querySelector("input#fullname").value,
            email: e.currentTarget.querySelector("input#email").value,
            phone_number: e.currentTarget.querySelector("input#phone").value,
            password: e.currentTarget.querySelector("input#password").value,
            country: e.currentTarget.querySelector("select#country").value,
            upline: e.currentTarget.querySelector("input#upline").value
        };

       
        //Check If name Consist of Space
        if(obj.username.indexOf(' ') >= 0) return cuteAlert({
            type: "error",
            title: "Username Cannot Contain Space",
            message:"Remove All Spaces Or Tabs From The Username Field",
            buttonText: "Okay"
        })

        //Check Password
        const password2 = e.currentTarget.querySelector("input#password2").value;
        
        if (obj.password !== password2) {
            return cuteAlert({
                type: "error",
                title: "Password Not Matched",
                message:"",
                buttonText: "Okay"
            })
        };
        
        //Check Agreed
        const agreed = e.currentTarget.querySelector("input#remember-check").checked;

        if (!agreed) {
            return cuteAlert({
                type: "error",
                title: "You Must Agreed To Terms & Conditions",
                message:"",
                buttonText: "Okay"
            })
        };
        

        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", undefined, true)
        
    })
})