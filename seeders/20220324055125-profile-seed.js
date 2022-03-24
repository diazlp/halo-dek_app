"use strict";
const fs = require("fs");
const path = "./data/profiles.json";

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
    let profileData = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));

    profileData = profileData.map(
      ({ UserID: UserId, fullName, age, gender }) => ({
        UserId,
        fullName,
        age,
        gender,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    return queryInterface.bulkInsert("Profiles", profileData, {});
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Profiles", null, {});
  },
};
