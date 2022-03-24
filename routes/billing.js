const { stripeKey } = require("../config/keys");
const stripe = require("stripe")(stripeKey);

module.exports = (app) => {
  app.post("/create-payment-intent", async (req, res) => {
    // Create a PaymentIntent with the order amount and currency

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};
