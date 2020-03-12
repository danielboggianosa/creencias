import sequelize from '../database/connection';
import Sequelize from 'sequelize'

const Objetivo = sequelize.define('objetivo', {
    objetivo: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { tableName: 'objetivos' });

export default Objetivo;