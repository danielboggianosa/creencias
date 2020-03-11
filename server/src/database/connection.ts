import config from './config';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.name, config.user, config.pass, config.connection);
export default sequelize;