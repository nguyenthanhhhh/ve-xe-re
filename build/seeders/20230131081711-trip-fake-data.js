"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Trips", [{
      fromStation: 1,
      toStation: 2,
      startTime: "2022-03-12",
      price: 120000,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
      createdAt: "2022-09-11",
      updatedAt: "2022-09-11",
      deletedAt: null
    }, {
      fromStation: 4,
      toStation: 2,
      startTime: "2022-03-12",
      price: 120000,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
      createdAt: "2022-09-11",
      updatedAt: "2022-09-11",
      deletedAt: null
    }, {
      fromStation: 1,
      toStation: 4,
      startTime: "2022-03-12",
      price: 120000,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
      createdAt: "2022-09-11",
      updatedAt: "2022-09-11",
      deletedAt: null
    }, {
      fromStation: 2,
      toStation: 3,
      startTime: "2022-03-12",
      price: 120000,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
      createdAt: "2022-09-11",
      updatedAt: "2022-09-11",
      deletedAt: null
    }, {
      fromStation: 3,
      toStation: 4,
      startTime: "2022-03-12",
      price: 120000,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
      createdAt: "2022-09-11",
      updatedAt: "2022-09-11",
      deletedAt: null
    }, {
      fromStation: 2,
      toStation: 4,
      startTime: "2022-03-12",
      price: 120000,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
      createdAt: "2022-09-11",
      updatedAt: "2022-09-11",
      deletedAt: null
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Trips", null, {});
  }
};