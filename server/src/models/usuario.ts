import sequelize from '../database/connection';
import Sequelize from 'sequelize';

const Usuario = sequelize.define('usuario', {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'nombre'
    },
    apellido: {
      type: Sequelize.STRING,
      field: 'apellido'
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: 'correo'
    },
    imagen: {
      type: Sequelize.STRING,
      field: 'imagen'
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'password'
    },
    rol:{
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, { tableName: 'usuarios' });

  export default Usuario;