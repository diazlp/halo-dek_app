const { User, Question, Prescription, Profile } = require("../models");
const { Op } = require("sequelize");

class Controller {
  static loginPage(req, res) {
    res.render("loginpage");
  }

  static registerPage(req, res) {
    const errQuery = req.query;

    console.log(errQuery);

    res.render("registerpage", { errQuery });
  }

  static registerPost(req, res) {
    const { username, email, password, fullName, age, gender } = req.body;

    User.create(
      {
        username,
        email,
        password,
      },
      {
        returning: true,
      }
    )
      .then((user) => {
        const UserId = user.id;

        Profile.create({
          fullName,
          age,
          gender,
          UserId,
        });

        res.redirect("/user/login");
      })
      .catch((err) => {
        err = err.errors.map(({ path, message, validatorKey }) => ({
          inputType: path,
          message,
          errType: validatorKey,
        }));

        let errString = ``;

        err.forEach(({ inputType, message }) => {
          errString += `${inputType}=${message}&`;
        });

        console.log(errString);

        res.redirect(`/user/register?${errString}`);
      });
  }
}

module.exports = Controller;
