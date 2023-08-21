'use strict';

/** @type {import('sequelize-cli').Migration} */
const { hashPassword } = require('../helpers/bcrypt')
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require('../data/user.json')
    user.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPassword(el.password)
    })

    await queryInterface.bulkInsert('Users', user, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', user, {})

  }
};
