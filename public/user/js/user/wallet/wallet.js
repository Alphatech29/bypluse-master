let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //MOBILE
    try {
       document.querySelector("form#mobile").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            w_fullname: e.currentTarget.querySelector("input#fullname").value,
            w_phone_number: e.currentTarget.querySelector("input#phone").value,
            w_type: "mobile"
        };


        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", "reload", true)
        
    }) 
    } catch (error) {
        
    }

    //BANK
    try {
       document.querySelector("form#bank").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            w_account_number: e.currentTarget.querySelector("input#number").value,
            w_account_name: e.currentTarget.querySelector("input#name").value,
            w_account_bank_name: e.currentTarget.querySelector("input#bankName").value,
            w_account_bank_type: e.currentTarget.querySelector("input#type").value,
            w_type: "bank"
        };


        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", "reload", true)
        
    }) 
    } catch (error) {
        
    }

    //CRYPTO
    try {
       document.querySelector("form#crypto").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            w_coin_name: e.currentTarget.querySelector("input#coiname").value,
            w_coin_address: e.currentTarget.querySelector("input#address").value,
            w_coin_network: e.currentTarget.querySelector("input#network").value,
            w_coin_memo: e.currentTarget.querySelector("input#memo").value,
            w_type: "crypto"
        };


        submit = e.currentTarget.querySelector("button#submit");
        fetchResourse(obj, window.location.href, "POST", "reload", true)
        
    }) 
    } catch (error) {
        
    }

    window.deleteWallet = function (btn) {
        submit = btn;

        cuteAlert({
                title: "Are you sure?",
                message: "Once deleted, you will not be able to recover this wallet!",
                type: "question",
                confirmText: "Yes, Proceed",
                cancelText: "No",
            }).then(wilDelete => {
                if (wilDelete === "confirm") {
                    submit = btn
                    fetchResourse({}, window.location.href, "DELETE", "reload", true)
                }
            })
        
        
    }
    
})