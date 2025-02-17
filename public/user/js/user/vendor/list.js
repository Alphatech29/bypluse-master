let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    window.deleteCoupon = function(id,btn){
        submit = btn;
        
        cuteAlert({
            title: "Are you sure?",
            message: "Once deleted, you will not be able to recover this coupon!",
            type: "question",
            confirmText: "Yes, Proceed",
            cancelText: "No",
        }).then(wilDelete => {
            if (wilDelete === "confirm") {
                submit = btn
                fetchResourse({id}, window.location.href, "DELETE", "reload", true)
            }
        })

        
    }
    
    window.deleteAllCoupon = function(btn){
        submit = btn;

        cuteAlert({
            title: "Are you sure?",
            message: "Once deleted, you will not be able to recover this coupon!",
            type: "question",
            confirmText: "Yes, Proceed",
            cancelText: "No",
        }).then(wilDelete => {
            if (wilDelete === "confirm") {
                submit = btn
                fetchResourse({type:"all"}, window.location.href, "DELETE", "reload", true)
            }
        })

        
    }
    
})