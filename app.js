/**
 * npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role:string
 *
 * npx sequelize-cli model:generate --name Question --attributes title:string,symptoms:text,description:text
 *
 * npx sequelize-cli model:generate --name Prescription --attributes name:string,diagnosis:string,cost:integer
 *
 * npx sequelize-cli migration:generate --name add_UserId_PrescriptionId_to_Questions
 */

const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
