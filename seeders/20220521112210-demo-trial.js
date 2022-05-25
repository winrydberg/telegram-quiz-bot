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
     await queryInterface.bulkInsert('Trials', [
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
        question: 'How was Ghana formerly known? ',
        ansa: 'Pangaea',
        ansb: 'Gondwana',
        ansc: 'Gold Coast',
        ansd: 'laurasia',
        cans: 'C',
        capoint: 10,
        wapoint: 0,
        type: 2,
        url: 'https://www.bing.com/th?id=OIP.BW54Wc2X6zBd8PyKkXgDqgHaHa&w=97&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
          question: 'Which country is to the east of Ghana? ',
          ansa: 'Algeria',
          ansb: 'Togo',
          ansc: 'Nigeria',
          ansd: 'Namibia',
          cans: 'B',
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
