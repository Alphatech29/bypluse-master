let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    //Submit Form
    document.querySelectorAll("form#settings").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                website_facebook: e.currentTarget.querySelector("input#facebook").value,
                website_twitter: e.currentTarget.querySelector("input#twitter").value,
                website_instagram: e.currentTarget.querySelector("input#instagram").value,
                website_youtube: e.currentTarget.querySelector("input#youtube").value
            };

        
            submit = e.currentTarget.querySelector("button");
            fetchResourse(obj,"/admin/saved","POST","reload")
        })
    })
})