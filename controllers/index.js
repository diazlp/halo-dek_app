const { User, Question, Prescription, Profile } = require("../models");
const { Op } = require("sequelize");
const convertStatus = require("../helpers");

class Controller {
  static checkDatabase(req, res) {
    Question.findAll({
      include: [
        {
          model: User,
          include: Profile,
        },
        {
          model: Prescription,
        },
      ],
    })
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static homepage(req, res, next) {
    const search = req.query.search;
    const user = req.session?.user;
    const paymentStatus = req.query.redirect_status;

    if (user && paymentStatus) {
      req.session.user.credits += 1;

      User.update(
        {
          credits: req.session.user?.credits,
        },
        {
          where: {
            username: req.session.user?.username,
          },
        }
      ).then(() => {
        next();
      });
    }

    let options = {
      include: [
        {
          model: User,
          include: Profile,
        },
        {
          model: Prescription,
        },
      ],
      order: [["createdAt", "DESC"]],
      where: {},
    };

    if (search) {
      options.where = {
        ...options.where,
        title: {
          [Op.iLike]: `%${search}%`,
        },
      };
    }

    Question.findAll(options)
      .then((questions) => {
        res.render("homepage", { questions, user });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static detailQuestion(req, res) {
    let id = req.params.id;
    const user = req.session?.user;

    Question.findByPk(id, {
      include: [
        {
          model: User,
          include: Profile,
        },
        {
          model: Prescription,
        },
      ],
    })
      .then((question) => {
        res.render("issue-detail", {
          question,
          Prescription,
          convertStatus,
          user,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static detailFormEdit(req, res) {
    let id = req.params.id;
    const user = req.session?.user;

    Question.findByPk(id, {
      include: [
        {
          model: User,
          include: Profile,
        },
        {
          model: Prescription,
        },
      ],
    })
      .then((question) => {
        res.render("edit-question", { question, user });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static detailEdit(req, res) {
    const { title, symptoms, description, UserId, PrescriptionId } = req.body;
    const id = req.params.id;

    Question.update(
      {
        title,
        symptoms,
        description,
        UserId,
        PrescriptionId,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        res.redirect(`/issue/${id}/detail`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static detailDelete(req, res) {
    const id = req.params.id;

    Question.destroy({ where: { id: id } })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addQuestionForm(req, res, next) {
    const errQuery = req.query;
    const user = req.session?.user;

    res.render("add-question", { errQuery, user });
  }

  static addQuestion(req, res, next) {
    const { title, symptoms, description, UserId, PrescriptionId } = req.body;
    const user = req.session?.user;

    // if (user) {
    //   req.session.user.credits -= 1;

    //   User.update(
    //     {
    //       credits: req.session.user?.credits,
    //     },
    //     {
    //       where: {
    //         username: req.session.user?.username,
    //       },
    //     }
    //   ).then(() => {
    //     next();
    //   });
    // }

    Question.create({
      title,
      symptoms,
      description,
      UserId,
      PrescriptionId,
    })
      .then(() => {
        return res.redirect("/");
      })
      .catch((err) => {
        err = err.errors?.map(({ path, message, validatorKey }) => ({
          inputType: path,
          message,
          errType: validatorKey,
        }));

        let errString = ``;

        err.forEach(({ inputType, message }) => {
          errString += `${inputType}=${message}&`;
        });

        return res.redirect(`/issue/add?${errString}`);
      });
  }
}

module.exports = Controller;
