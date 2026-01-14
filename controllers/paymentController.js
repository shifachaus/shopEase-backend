const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    description: "Ecommerce Order Payment",
    payment_method_types: ["card"],
    shipping: {
      name: req.user?.name,
      address: {
        line1: req.body.shippingInfo.address,
        city: req.body.shippingInfo.city,
        state: req.body.shippingInfo.state,
        postal_code: req.body.shippingInfo.pinCode,
        country: req.body.shippingInfo.country,
      },
    },
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ succes: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
