"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const creencia_1 = __importDefault(require("../models/creencia"));
const objetivo_1 = __importDefault(require("../models/objetivo"));
const usuario_1 = __importDefault(require("../models/usuario"));
// LLAMADO DE MODELO PARA CREACIÓN
usuario_1.default;
// CONFIGURACIÓN DE ASOCIACIONES
objetivo_1.default.belongsToMany(creencia_1.default, {
    through: "objetivos_creencias",
    foreignKey: 'objetivo',
    otherKey: 'creencia',
    as: 'Creencias'
});
creencia_1.default.belongsToMany(objetivo_1.default, {
    through: "objetivos_creencias",
    foreignKey: 'creencia',
    otherKey: 'objetivo',
    as: 'Objetivos'
});
// CREACIÓN DE LA BASE DE DATOS
const db_init = connection_1.default.sync(
// Creación forzada: eliminará tablas existentes y creará nuevas
// {force:true}
).
    then(() => console.log('Base de datos configurada'))
    .catch((err) => console.error(err));
exports.default = db_init;
