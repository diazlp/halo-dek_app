"use strict";
const fs = require("fs");
const path = "./data/prescriptions.json";

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let prescData = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));

    prescData = prescData.map(({ name, diagnosis, cost }) => ({
      name,
      diagnosis,
      cost,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Prescriptions", prescData, {});
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Prescriptions", null, {});
  },
};
