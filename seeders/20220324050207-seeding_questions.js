"use strict";
const fs = require("fs");
const path = "./data/questions.json";

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

    let questionData = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));

    questionData = questionData.map(
      ({
        UserID: UserId,
        PrescriptionID: PrescriptionId,
        title,
        symptomps: symptoms,
        description,
      }) => ({
        UserId,
        PrescriptionId,
        title,
        symptoms,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    return queryInterface.bulkInsert("Questions", questionData, {});
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("Questions", null, {});
  },
};
