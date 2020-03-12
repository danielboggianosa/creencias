import sequelize from '../database/connection';
import Sequelize from 'sequelize'

const Creencia = sequelize.define('creencia', {
    creencia: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { tableName: 'creencias' });

export default Creencia;