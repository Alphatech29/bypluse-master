
let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SPILL BY REFERRAL
    document.querySelector("form#referral").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
                min_referral: e.currentTarget.querySelector("input#minref").value,
                amount: e.currentTarget.querySelector("input#amount").value,
            
        };

        submit = e.currentTarget.querySelector("button#button");

        swal({
                title: "Are you sure?",
                text: "You cannot reverse this once spill!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(willSpill => {
                if (willSpill) {
                    fetchResourse(filterEmptyObj(obj),`${window.location.origin + window.location.pathname}?type=referral`,"POST","noload")
                }
            })
        
        
    });
    
    //SPILL BY PACKAGE
    document.querySelector("form#packages").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
                packageId: e.currentTarget.querySelector("select#package").value,
                amount: e.currentTarget.querySelector("input#amount").value,
            
        };

        submit = e.currentTarget.querySelector("button#button");

        swal({
                title: "Are you sure?",
                text: "You cannot reverse this once spill!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(willSpill => {
                if (willSpill) {
                    fetchResourse(filterEmptyObj(obj),`${window.location.origin + window.location.pathname}?type=package`,"POST","noload")
                }
            })
        
        
    });
    
    //SPILL BY USER
    document.querySelector("form#users").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
                userId: e.currentTarget.querySelector("select#user").value,
                amount: e.currentTarget.querySelector("input#amount").value,
            
        };

        submit = e.currentTarget.querySelector("button#button");

        swal({
                title: "Are you sure?",
                text: "You cannot reverse this once spill!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(willSpill => {
                if (willSpill) {
                    fetchResourse(filterEmptyObj(obj),`${window.location.origin + window.location.pathname}?type=user`,"POST","noload")
                }
            })
        
        
    });


})