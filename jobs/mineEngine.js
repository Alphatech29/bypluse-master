const { editUserById } = require("../helpers/user");
const { getAllActiveMiners, updateMine, newMine, updateUserMines } = require("../helpers/mine");
const CronJob = require('cron').CronJob;
const { getPackageById } = require("../helpers/packages");
const { addMinuteToDate } = require("../helpers/dateTime");
const { bonusInfo } = require("../extras/bonusInfo");

//This Job Running Every 12 oclock
new CronJob('* * * * * *', async function () {

    //Get All Active Miners
    const miners = await getAllActiveMiners();

    //Loop Through All Miners
    for (i = 0; i < miners.length; i++){
        const diffInMiliSeconds = (new Date(miners[i].m_end_time) - new Date()) / 1000;
     
        if (diffInMiliSeconds <= 0) {
            //Update The Mine History
            await updateMine(miners[i].m_id, {
                m_status: 1,
                m_balance: miners[i].m_amount + miners[i].mining_balance
            });

            //Update User Balance
            await editUserById(miners[i].uid, {
                mining_balance: miners[i].m_amount + miners[i].mining_balance
            })

            //Complete All User Mines
            await updateUserMines(miners[i].uid)

            //Check If Plan Is Auto Start, Start Auto Mining
            const plan = await getPackageById(miners[i].plan_id);
            if(plan && plan.plan_auto_mining){
                const obj = {
                    m_user_id: miners[i].uid,
                    m_start_time: new Date(),
                    m_end_time: addMinuteToDate(miners[i].plan_mining_minute),
                    m_seconds: miners[i].plan_mining_minute * 60,
                    m_amount: miners[i].plan_mining_amount,
                    m_text: bonusInfo.mine.text
                }
                await newMine(obj);
            }
            
        }

    }
    
   
}, null, true, "Africa/Lagos");

