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
    queryInterface.bulkInsert(
      "vehicles",
      [
        {
          name: "Xe 22B",
          trip_id: 1,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Xe 39",
          trip_id: 2,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Xe 78",
          trip_id: 3,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Xe 103",
          trip_id: 4,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Xe Dũng Thủy",
          trip_id: 5,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Xe 777",
          trip_id: 6,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Xe 22C",
          trip_id: 3,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Xe Điện",
          trip_id: 2,
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Xe 22B",
          trip_id: 6,
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
    await queryInterface.bulkDelete("vehicles", null, {});
  },
};
