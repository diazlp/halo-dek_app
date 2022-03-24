const { User, Question, Prescription, Profile } = require("../models");
const { Op } = require("sequelize");

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

  static homepage(req, res) {
    const search = req.query.search;

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
        // res.send(questions);
        res.render("homepage", { questions });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static detailQuestion(req, res) {
    let id = req.params.id;

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
        res.render("issue-detail", { question });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addQuestionForm(req, res) {
    res.render("add-question");
  }

  static addQuestion(req, res) {
    const { title, symptoms, description, UserId, PrescriptionId } = req.body;

    Question.create({
      title,
      symptoms,
      description,
      UserId,
      PrescriptionId,
    })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
