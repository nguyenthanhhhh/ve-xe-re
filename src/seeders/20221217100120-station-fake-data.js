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
      "Stations",
      [
        {
          name: "Bến xe Mỹ Đình",
          address: "Nam Từ Liêm",
          province: "Hà Nội",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Bến xe Yên Nghĩa",
          address: "QL6, Phú Lâm, Hà Đông",
          province: "Hà Nội",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Bến xe Hà Đông",
          address: "XQHP+56J, Nguyễn Trãi, P. Văn Quán, Hà Đông",
          province: "Hà Nội",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
          createdAt: "2022-09-11",
          updatedAt: "2022-09-11",
          deletedAt: null,
        },
        {
          name: "Bến xe Phổ Yên",
          address: "CV6F+922, QL3, Ba Hàng, Phổ Yên",
          province: "Thái Nguyên",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmFfNJPl3PaH9QXW1MfwdOWvtBWmhjgZfhA&usqp=CAU",
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
    await queryInterface.bulkDelete("Stations", null, {});
  },
};
