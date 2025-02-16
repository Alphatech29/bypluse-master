let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    //Submit Form
    document.querySelectorAll("form#withdrawal").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                website_act_withdrawal_status: e.currentTarget.querySelector("input#withactstatus").checked ? 1 : 0,
                website_ref_withdrawal_status: e.currentTarget.querySelector("input#withrefstatus").checked ? 1 : 0,
                website_min_withdrawal: e.currentTarget.querySelector("input#minwin").value,
                website_max_withdrawal: e.currentTarget.querySelector("input#maxwin").value
            };

            submit = e.currentTarget.querySelector("button");
            fetchResourse(obj,"/admin/saved","POST","reload")
        })
    })
})