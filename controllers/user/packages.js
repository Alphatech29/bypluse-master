const asyncHandler = require("../../helpers/asyncHandler");
const { fetcher } = require("../../helpers/fetcher");
const { couponPay } = require("../../helpers/gateway");
const { openToken } = require("../../helpers/jwt");
const { getPackages,getPackageById } = require("../../helpers/packages");
const { getWebSettings } = require("../../helpers/settings");

//PACKAGE (GET)
exports.packagesListGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const packages = await getPackages();

    return res.render("user/pages/package/package", {
        title: "Subscription Plans",
        packages
    })

})

//PACKAGE (PUT)
exports.packagesListPut = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    if (req.body.gateway === "coupon") {
        try {
            await couponPay(id, req.body.code, req.body.plan);
            return res.json({ status: true, message: "Action Successfully", goto: "/user/dashboard" })
            
        } catch (error) {
            return res.json({ status: false, message: new Error(error).message })

            
        }
    } else if (req.body.gateway === "opay") {
        return res.json({ status: false, message: "Not Yet Available" })
    } else if (req.body.gateway === "crypto") {

        //Get Plan Details
        const plan = await getPackageById(req.body.plan);
        
        if(!plan) return res.json({ status: false, message: "Plan Not Found"});

        const { website_coinbase_key,website_currency,website_url } = await getWebSettings();

        //Create Charges
        const obj = {
            name: `${plan.plan_name} Subscription`,
            description: `${plan.plan_name} Subscription At ${website_currency}${plan.plan_price.toLocaleString()} `,
            local_price: {
                amount: plan.plan_price,
                currency: website_currency == "$" ? "USD" : "NGN"
            },
            pricing_type: "fixed_price",
            metadata: {
                customer_id: id,
                plan: plan
            },
            redirect_url: `${website_url}/user/dashboard`,
            cancel_url: `${website_url}/user/dashboard`
        }

        const headers = {
            "X-CC-Api-Key": website_coinbase_key,
            "X-CC-Version": "2018-03-22"
        }

        try {
            
            const {data} = await fetcher(obj,"https://api.commerce.coinbase.com/charges","POST",headers);

            //Response With Checkout Hosted Url
            return res.json({ status: true, url:data.hosted_url})

        } catch (error) {
            return res.json({ status: false, message:error.message})
        }
        

    } else {
        return res.json({ status: false, message: "Invalid Paramater" })
    }
    

})

