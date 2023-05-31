const router = require("express").Router();

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// const stripe = require("stripe")("sk_test_tR3PYbcVNZZ796tH88S4VQ2u");

const calculateOrderAmount = (days) => {
  const total = days * 120;
  return total;
};

router.post("/display", async (req, res) => {
  const { days } = req.body;
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(days),
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(401).json(err);
  }
});
module.exports = router;
