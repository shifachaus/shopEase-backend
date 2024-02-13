const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ succes: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : "*";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);

  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
