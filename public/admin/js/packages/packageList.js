
let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    //EDIT PACKAGE
    document.querySelectorAll("form#edit").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                plan_name: e.currentTarget.parentElement.querySelector("input#name").value,
                plan_price: e.currentTarget.parentElement.querySelector("input#price").value,
                plan_mining_minute: e.currentTarget.parentElement.querySelector("input#duration").value,
                plan_mining_amount: e.currentTarget.parentElement.querySelector("input#reward").value,
                plan_min_withdrawal: e.currentTarget.parentElement.querySelector("input#min_withdrawal").value,
                plan_max_withdrawal: e.currentTarget.parentElement.querySelector("input#max_withdrawal").value,
                plan_vendor_coupon_commission: e.currentTarget.parentElement.querySelector("input#vendor").value,
                plan_status: e.currentTarget.parentElement.querySelectorAll(".switch-button input")[1].checked ? 1 : 0,
                plan_auto_mining: e.currentTarget.parentElement.querySelectorAll(".switch-button input")[0].checked ? 1 : 0
                
            };
       
            const id = e.currentTarget.parentElement.querySelector("input#id").value;

            submit = e.currentTarget.parentElement.querySelector("button#button");

            fetchResourse(filterEmptyObj(obj),`${window.location.origin + window.location.pathname}?id=${id}`,"PUT","reload")
        });
        
    });

    //CREATE PACKAGE
    document.querySelector("form#new").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            plan_name: e.currentTarget.querySelector("input#name").value,
            plan_price: e.currentTarget.querySelector("input#price").value,
            plan_mining_minute: e.currentTarget.querySelector("input#duration").value,
            plan_mining_amount: e.currentTarget.querySelector("input#reward").value,
            plan_min_withdrawal: e.currentTarget.querySelector("input#min_withdrawal").value,
            plan_max_withdrawal: e.currentTarget.querySelector("input#max_withdrawal").value,
            plan_vendor_coupon_commission: e.currentTarget.querySelector("input#vendor").value,
            plan_status: e.currentTarget.querySelectorAll(".switch-button input")[1].checked ? 1 : 0,
            plan_auto_mining: e.currentTarget.querySelectorAll(".switch-button input")[0].checked ? 1 : 0
            
        };

        submit = e.currentTarget.querySelector("button#button");
        fetchResourse(filterEmptyObj(obj),`${window.location.origin + window.location.pathname}`,"POST","reload")
    });

    //Delete Package
    window.deletePackage = function (packageId, btn) {
        submit = btn;
        swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse({},`${window.location.origin + window.location.pathname}?id=${packageId}`,"DELETE","reload")
                }
            })
        
    }

})