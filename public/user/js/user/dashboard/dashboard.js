let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    

    //Copy Referral Link
    document.querySelector("form#referrallink").addEventListener("submit", e => {
        e.preventDefault();
        const input = e.currentTarget.querySelector("input");
        input.select();
        document.execCommand("copy");
        input.blur();

        cuteAlert({
            type: "success",
            title: "Referral Link Copied",
            message: 'Earn more by sharing your link to friends and families',
            buttonText: "Okay, Thanks!"
        })
        
    
    });


    //NOTICE
    window.noticeBtn = document.querySelector("button#noticebtn");
    noticeBtn.click()

    document.querySelector("button#closenotice").addEventListener("click", () => {
        fetchResourse({}, "/user/notice/read", "POST", "noload");
    })

})