const express = require("express");
const app = express();
const { stripeKey, secretKey } = require("./config/keys");
const stripe = require("stripe")(stripeKey);
const session = require("express-session");

const router = require("./routes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `/success.html`,
//     cancel_url: `/cancel.html`,
//   });

//   res.redirect(303, session.url);
// });

// app.post("/charge", (req, res) => {
//   try {
//     stripe.customers
//       .create({
//         name: req.body.name,
//         email: req.body.email,
//         source: req.body.stripeToken,
//       })
//       .then((customer) =>
//         stripe.charges.create({
//           amount: req.body.amount * 100,
//           currency: "usd",
//           customer: customer.id,
//         })
//       )
//       .then(() => res.render("success"))
//       .catch((err) => console.log(err));
//   } catch (err) {
//     res.send(err);
//   }
// });

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    // amount: calculateOrderAmount(items),
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

app.use("/", router);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role:string
 *
 * npx sequelize-cli model:generate --name Question --attributes title:string,symptoms:text,description:text
 *
 * npx sequelize-cli model:generate --name Prescription --attributes name:string,diagnosis:string,cost:integer
 *
 * npx sequelize-cli migration:generate --name add_UserId_PrescriptionId_to_Questions
 */
