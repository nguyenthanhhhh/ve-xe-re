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
    await queryInterface.bulkInsert(
      "seats",
      [
        {
          name: "1",
          vehicle_id: 1,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "2",
          vehicle_id: 1,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "3",
          vehicle_id: 1,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "4",
          vehicle_id: 1,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "5",
          vehicle_id: 1,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "1B",
          vehicle_id: 2,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "2B",
          vehicle_id: 2,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "3B",
          vehicle_id: 2,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "4B",
          vehicle_id: 2,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },

        {
          name: "1C",
          vehicle_id: 3,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "2C",
          vehicle_id: 3,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "3C",
          vehicle_id: 3,
          status: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("seats", null, {});
  },
};
