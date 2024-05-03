'use strict';
const {Op} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      username: 'jerren',
      email: 'djerren@gmail.com',
      verified: true,
      first_time: true,
      stripe_verified: true,
      hashedPassword: '$2a$10$i9IidsyiOnDiqD0PCnOjzuYrhTAu6OJ5RSG7xz6/kD7YQkvYWq5ju',
      stripe_account_id: 'acct_1PBj7R08wNgkXVQ3',
      createdAt: '2024-05-01 15:47:08.66-04',
      updatedAt: '2024-05-01 15:48:20.934-04'
    },
    {
      username: 'commerce',
      email: 'cloudninejd@gmail.com',
      verified: true,
      first_time: true,
      stripe_verified: true,
      hashedPassword: '$2a$10$C/dI4ryD5nvZCgkdFmUvEe4ZVC55jSiyFOaRON2DDMkkJGahT8SJK',
      stripe_account_id: 'acct_1PBj8x05gEvpC76F',
      createdAt: '2024-05-01 15:48:42.85-04',
      updatedAt: '2024-05-01 15:49:50.473-04'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {
      where: {
        username: {
          [Op.in]: ['jerren', 'commerce']
        }
      }
    })
  }
};
