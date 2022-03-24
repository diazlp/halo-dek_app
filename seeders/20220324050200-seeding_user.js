"use strict";
const fs = require("fs");
const path = "./data/users.json";

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

    let userData = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));

    userData = userData.map(({ username, email, password, role, credits }) => ({
      username,
      email,
      password,
      role,
      credits,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Users", userData, {});
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
