"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      // User.hasMany(models.Question, { foreignKey: "UserId" });

      User.belongsToMany(models.Prescription, {
        through: "Questions",
        foreignKey: "UserId",
      });
      User.hasOne(models.Profile, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter username!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          emailValidation(value) {
            if (!value.trim()) {
              throw new Error("Please enter email!");
            } else if (!value.trim().includes("@")) {
              throw new Error("Format email is not valid");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter password!",
          },
        },
      },
      role: DataTypes.STRING,
      credits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        beforeCreate: (User, options) => {
          User.role = "patient";
          User.credits = 0;

          const salt = bcrypt.genSaltSync(10);
          User.password = bcrypt.hashSync(User.password, salt);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
