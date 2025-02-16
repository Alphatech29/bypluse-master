let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    try {
        //Mark One Mark All
    document.querySelector("input#mark-head").addEventListener("change", e => {
        document.querySelectorAll("input#mark").forEach(m => {
            m.checked = e.currentTarget.checked
        })
    });
    } catch (error) {
        console.log(error)
    }


    try {
    //Mark Request
    document.querySelector('a#approved-marked').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };
        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    withdrawalId: m.dataset.withdrawal_id
                });
            }
        });

        
        submit = document.querySelector("a#approved-marked")
        fetchResourse(obj,"/admin/withdrawal/approved","PUT","reload") 

    })
        
    //DELETE Request
    document.querySelector('a#delete-all').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };
        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.withdrawal_id
                });
            }
        });
        
        submit = document.querySelector("a#delete-all")
        swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse(obj,"/admin/withdrawal/delete","DELETE","reload") 
                }
            })
        
        

    })
        
    } catch (error) {
        
    };

    
    //APPROVE WITHDRAWAL
    window.approvePayment = function (withdrawalId, btn) {
        
        submit = btn;
        
        swal({
                title: "Are you sure you want to approve this withdrawal?",
                text: "You cannot revert this once done!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse({withdrawalId},window.location.href,"PUT","reload") 
                }
            })
        
    }
    
    //DECLINE WITHDRAWAL
    window.declinePayment = function (withdrawalId, btn) {
        
        submit = btn;

        swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse({id:withdrawalId},window.location.href,"DELETE","reload") 
                }
            })
        
    }




   

    try {
        document.querySelector("form#search").addEventListener("submit", e => {
            e.preventDefault();
            const value = e.currentTarget.querySelector("input").value;

            if (value) {
                window.location.href = `${location.origin + location.pathname}?trans=${value}`
            }
        })
    } catch (error) {
        
    }

    
})