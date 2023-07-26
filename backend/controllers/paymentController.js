


const catchAsyncErrors = require("../middleware/catchAsyncErrors");


const stripe = require("stripe")("sk_test_51MdGkwSIpJeWki8MWoWx6cVSiTeLCNdEddsimzoE2QUKlmas0EQxmF29nG7uJgNnmRgDKQb6uxfEbPBINuTrNHk200KOkD07Z0");

exports.processPayment = catchAsyncErrors(async (req,res,next) => {
   
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata:{
            company: "Ecommerce",
        },
    });
    console.log(myPayment)
    res.status(200).json({
        success: true,
        client_secret:myPayment.client_secret,
    });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req,res,next) => {
    res.status(200).json({
        stripeApiKey: "pk_test_51MdGkwSIpJeWki8MzVWPQrmHg6NSgyqmlZtDxrct0i3Kt3hStRMZgNppMEWELXhdEoP0QiathPPVPXYZfkKSM8dt007eAKalpl",
    })
})