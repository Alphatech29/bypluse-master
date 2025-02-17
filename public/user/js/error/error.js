document.addEventListener("DOMContentLoaded", () => {
    //Date
    document.querySelector("span#date").textContent = new Date().getFullYear();

    //Go Back Button
    document.querySelector("a#back").addEventListener("click", () => window.history.back());
    
})