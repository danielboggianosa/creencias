import sequelize from './connection';
import Creencia from '../models/creencia'
import Objetivo from '../models/objetivo';

// LLAMADO DE MODELO PARA CREACIÓN

// CONFIGURACIÓN DE ASOCIACIONES
Objetivo.belongsToMany(Creencia, {
    through: "objetivos_creencias",
    foreignKey: 'objetivo',
    otherKey: 'creencia',
    as:'Creencias'
})

Creencia.belongsToMany(Objetivo, {
    through: "objetivos_creencias",
    foreignKey: 'creencia',
    otherKey: 'objetivo',
    as:'Objetivos'
})

// CREACIÓN DE LA BASE DE DATOS
const db_init = sequelize.sync(
  // Creación forzada: eliminará tablas existentes y creará nuevas
  // {force:true}
).
then(
  ()=>console.log('Base de datos configurada')
)
.catch(
  (err:any)=>console.error(err)
)

export default db_init;