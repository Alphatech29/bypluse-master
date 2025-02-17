function fetchResourse(body, url, method,goto,jsonMode) {
        
    return new Promise((resolve, reject) => {
        
        loadingState(submit,true)
        fetch(url, {
                    method,
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        [jsonMode && "content-type"]:"application/json",
                    },
                    body: jsonMode ? JSON.stringify(body) : body
                })
                    .then(res => res.json())
                    .then(res => {
                        let redirectUrl = res.goto;

                        loadingState(submit,false)
                        if (res.status) {

                            //First Check If Operation Need To Continue
                            if (goto === "noload") {
                                return resolve(res)
                            }
                            
                            cuteAlert({
                                type: "success",
                                title: res.message,
                                message: res.text || '',
                                buttonText: "Okay"
                            }).then(() => {
                               
                                if (goto === "reload") {
                                    window.location.reload()
                                } else if (goto === "nothing") {
                                    return resolve(res)
                                }  else {
                                   window.location.href = redirectUrl
                                }
                    })
                        } else {
                            cuteAlert({
                                type: "error",
                                title: res.message,
                                message: res.text || '',
                                buttonText: "Okay"
                            }).then(()=> resolve(res))
                        }
                    }).catch(err => {
                        loadingState(submit,false)
                    cuteAlert({
                                type: "error",
                                title: "Something Went Wrong",
                                message: err.message || '',
                                buttonText: "Okay"
                            }).then(()=> reject(err))
                    })
        
    })
}

function loadingState(element, state) {
        if (state) {
            cbText = element.textContent;
            element.innerHTML = `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
  }