const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  database: 'dcpqo6ljgcmudv',
  host: 'ec2-54-152-28-9.compute-1.amazonaws.com',
  username: 'zlyjtchmmedelo',
  password: '392e05eb10d2fd5a67466d517597ac2817ad0555bdc0170d4df81c03297818f5',
  dialect: 'postgres',
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
