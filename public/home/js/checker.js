
let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    

    document.querySelector("form#checker").addEventListener("submit", async e => {
        e.preventDefault();

        const code = e.currentTarget.querySelector("input").value

            
        submit = e.currentTarget.querySelector("button#submit");
        const data = await fetchResourse({}, `${window.location.origin + window.location.pathname}?code=${code}`, "POST","nothing",true)

            
        
    })


})