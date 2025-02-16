let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
   //Search Coupon
    try {
        document.querySelector("form#search").addEventListener("submit", e => {
            e.preventDefault();
            const search = e.currentTarget.querySelector("input").value;

            if (!search) {
                return
            }

            window.location.href = `${window.location.origin + window.location.pathname}?search=${search}`
        });

        document.querySelector("a.reset").addEventListener("click", e => {
            window.location.href = `${window.location.origin + window.location.pathname}`
        })
        
    } catch (error) {
        
    }
    

    //Search By Type
    try {
        document.querySelector("select#type").addEventListener("change", e => {
            window.location.href = `${window.location.origin + window.location.pathname}?type=${e.currentTarget.value}`
        })
    } catch (error) {
        
    }

    //Generate COupon
    try {
        document.querySelector("form#create-coupon").addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                quantity: e.currentTarget.querySelector("input").value,
                amount: e.currentTarget.querySelector("select#price").value,
            };

            submit = e.currentTarget.querySelector("button")
            fetchResourse(obj, `${window.location.origin + window.location.pathname}`, "POST", "reload")
            
        })
    } catch (error) {
        
    }
    try {
        document.querySelector("input#mark-head").addEventListener("change", e => {
        document.querySelectorAll("input#mark").forEach(m => {
            m.checked = e.currentTarget.checked
        })
    });
    } catch (error) {
        
    }


    //APPROVE ALL
    try {
        
        document.querySelector('a#deleteMarked').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };
        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.id
                });
            }
        });

        
        submit = document.querySelector("a#deleteMarked")
        swal({
                title: "Are you sure?",
                text: "You cannot undo this action!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(proceed => {
                if (proceed) {
                    fetchResourse(obj,`${window.location.origin + window.location.pathname}`,"DELETE","reload") 
                }
            })
        
        

        })
        
    } catch (error) {
        
    }
    
    //APPROVE ONE
    try {
        
        document.querySelectorAll('a#deleteCoupon').forEach(btn => {
        btn.addEventListener("click", b => {
            const obj = {
                id: b.currentTarget.dataset.id
            };

            submit = btn
        swal({
                title: "Are you sure?",
                text: "You cannot undo this action!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(proceed => {
                if (proceed) {
                    fetchResourse(obj,`${window.location.origin + window.location.pathname}`,"DELETE","reload") 
                }
            })

        })
        })
        
    } catch (error) {
        
    }

        

    //DELETE ALL
    try {
        
        document.querySelector('a#delete-marked').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };
        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.id,
                    userId: m.dataset.user_id,
                    amount: m.dataset.amount,
                    proof: m.dataset.proof
                });
            }
        });

        
        submit = document.querySelector("a#delete-marked")
        swal({
            title: "Are you sure?",
            text: "You cannot recover this once deleted!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(proceed => {
            if (proceed) {
                fetchResourse(obj, `${window.location.origin + window.location.pathname}`, "DELETE", "reload")
            }
        })
        
        

        });
        
    } catch (error) {
        
    }

    //DELETE ONE
    try {

       document.querySelectorAll('a#delete-one-btn').forEach(btn => {
        btn.addEventListener("click", b => {
            const obj = {
                id: b.currentTarget.dataset.id,
                userId: b.currentTarget.dataset.user_id,
                amount: b.currentTarget.dataset.amount,
                proof: b.currentTarget.dataset.proof
            };

            submit = document.querySelector('a#delete-one-btn')
        swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(proceed => {
                if (proceed) {
                    fetchResourse(obj,`${window.location.origin + window.location.pathname}`,"DELETE","reload") 
                }
            })

        })
       })
        
    } catch (error) {
        
    }


})