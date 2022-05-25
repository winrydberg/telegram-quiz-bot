'use strict';

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
     await queryInterface.bulkInsert('IntermediateQuestions', [
      {
        question: 'When did Ghana become independent? ',
        ansa: '6 March 1957',
        ansb: '6 March 1958',
        ansc: '6 May 1957',
        ansd: '1 July 1957',
        cans: 'A',
        capoint: 10,
        wapoint: 0,
        type: 1,
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
          question: 'When did the Portuguese build Elmina Castle',
          ansa: '1526',
          ansb: '1453',
          ansc: '1482',
          ansd: '1498',
          cans: 'C',
          capoint: 10,
          wapoint: 0,
          type: 1,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
          },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
