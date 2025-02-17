document.addEventListener("DOMContentLoaded", () => {
    const mine = document.querySelector("#mine");
    const balance = document.querySelector("span.points");
    const engine = document.querySelector(".mine-wrapper");
    const engineBtn = document.querySelector("button.mine-engine");
    const intro = document.querySelector("p#intro");
    const hourEle = document.querySelector(".timer span.hour");
    const minutesEle = document.querySelector(".timer span.minute");
    const secondsEle = document.querySelector(".timer span.seconds");
    const body = document.querySelector("body");
    let state = false;
    let interval;

    async function refreshMining() {
        //Fetch Data From Server
        submit = intro;
        const mineDetails = await fetchResourse({}, "/user/mine/refresh", "POST", "noload");

        if (!mineDetails.data) return;

        const endTime = new Date(mineDetails.data.m_end_time)

        interval = setInterval(() => {
            state && startMining(endTime, mineDetails.data.m_seconds, mineDetails.data.m_amount)
        }, 1000);

        setInit()
    }
    
    //Engine Clicked
    engine.addEventListener("click", async e => {
     
        //Fetch Data From Server
        submit = intro;
        const mineDetails = await fetchResourse({}, "/user/mine/start", "POST", "noload");

        if (!mineDetails.status) return;


        const endTime = new Date(mineDetails.data.endDate)

        interval = setInterval(() => {
            state && startMining(endTime,mineDetails.data.seconds,mineDetails.data.amount)
        }, 1000);

        setInit()

    })

    function setInit() {
        body.classList.add("mine-active");
        mine.classList.add("bg-dark");

        engineBtn.classList.add("pulse");
        intro.innerHTML = `<i class="bx bx-loader bx-spin"></i> Mining`

        state = true
    }
    
    function startMining(end,secondsDb,amountDb) {
        // Calculate time between two dates:
        var date1 = new Date(end);
        var date2 = new Date();

        var diffInMiliSeconds = (date1 - date2) / 1000;
        var hours = Math.floor(diffInMiliSeconds / 60 / 60 % 24);
        var minutes = Math.floor(diffInMiliSeconds / 60 % 60);
        var seconds = Math.floor(diffInMiliSeconds % 60);
  
        //Earnings
        balance.textContent = ((amountDb / secondsDb) * (secondsDb - diffInMiliSeconds)).toFixed(8)

        //Time
        hourEle.textContent = ('0' + hours).slice(-2)
        minutesEle.textContent = ('0' + minutes).slice(-2)
        secondsEle.textContent = ('0' + seconds).slice(-2)
    
        if (diffInMiliSeconds <= 0) {
            clearInterval(interval)
            state = false;
            stopMining()
        }
        
    }
    

    function stopMining() {
        body.classList.remove("mine-active");
        mine.classList.remove("bg-dark");

        engineBtn.classList.remove("pulse");
        intro.innerHTML = "Click To Start Mining"

        hourEle.textContent = '00'
        minutesEle.textContent = '00'
        secondsEle.textContent = '00'
    }

    //INIT
    refreshMining()


})
