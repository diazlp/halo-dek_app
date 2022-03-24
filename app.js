const express = require("express");
const app = express();
const { secretKey } = require("./config/keys");
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
      maxAge: 3600 * 1000,
    },
  })
);

require("./routes/billing")(app);

app.use("/", router);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
