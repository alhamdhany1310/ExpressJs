const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  // database: 'sequelize-task',
  // host: 'localhost',
  // username: 'root',
  // password: '',
  // dialect: 'mysql',
  // ===========================
  // database: 'hilj2267_express',
  // host: '110.136.219.91',
  // username: 'hilj2267_dani',
  // password: '123loginok!',
  // dialect: 'mysql',
  // ==========================
  database: 'dend401p5hkbp8',
  host: 'ec2-52-205-61-230.compute-1.amazonaws.com',
  username: 'ctkauakxjeetvz',
  password: '6575e7855bdb2dbd88b4a69cbb5a543ecf7380774bd7cd0eda428aec7406b1be',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
