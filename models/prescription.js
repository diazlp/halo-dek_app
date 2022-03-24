"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prescription.belongsToMany(models.User, {
        through: "Questions",
        foreignKey: "PrescriptionId",
      });
    }

    static formatCurrencyToIDR(money) {
      return `Rp ${money.toLocaleString("id-ID")},00`;
    }
  }
  Prescription.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diagnosis: DataTypes.STRING,
      cost: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Prescription",
    }
  );
  return Prescription;
};
