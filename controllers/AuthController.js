const { User, Question, Prescription, Profile } = require("../models");
const bcrypt = require("bcryptjs");

class AuthController {
  static registerPage(req, res) {
    const errQuery = req.query;
    const user = req.session?.user;

    res.render("registerpage", { errQuery, user });
  }

  static registerPost(req, res) {
    const { username, email, password } = req.body;

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
      .then((User) => {
        const UserId = User.id;
        res.redirect(`/user/register/${UserId}/profile`);
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

        res.redirect(`/user/register?${errString}`);
      });
  }

  static profilePage(req, res) {
    const UserId = req.params.id;
    const errQuery = req.query;
    const user = req.session?.user;

    res.render("profilepage", { UserId, errQuery, user });
  }

  static profilePost(req, res) {
    const { fullName, age, gender } = req.body;
    const UserId = req.params.id;

    Profile.create({
      fullName,
      age,
      gender,
      UserId,
    })
      .then(() => {
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

        res.redirect(`/user/register/${UserId}/profile?${errString}`);
      });
  }

  static loginPage(req, res) {
    const err = req.query.error;
    const user = req.session?.user;

    res.render("loginpage", { err, user });
  }

  static loginPost(req, res) {
    const { username, password } = req.body;

    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);

          if (isValidPassword) {
            req.session.user = user.username;

            return res.redirect("/");
          } else {
            const err = `You entered invalid username/password`;

            return res.redirect(`/user/login?error=${err}`);
          }
        } else {
          const err = `Invalid input on username/password`;

          return res.redirect(`/user/login?error=${err}`);
        }
        // res.send(user);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = AuthController;
