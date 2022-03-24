"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Question.belongsTo(models.User, { foreignKey: "UserId" });
      Question.belongsTo(models.Prescription, { foreignKey: "PrescriptionId" });
    }

    formatPostedDate() {
      return `${this.createdAt.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`;
    }
  }
  Question.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please enter your complaint!",
          },
        },
      },
      symptoms: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please enter your symptoms!",
          },
        },
      },
      description: DataTypes.TEXT,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PrescriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
