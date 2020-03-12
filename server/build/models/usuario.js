"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = __importDefault(require("sequelize"));
const Usuario = connection_1.default.define('usuario', {
    nombre: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        field: 'nombre'
    },
    apellido: {
        type: sequelize_1.default.STRING,
        field: 'apellido'
    },
    correo: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
        field: 'correo'
    },
    imagen: {
        type: sequelize_1.default.STRING,
        field: 'imagen'
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        field: 'password'
    },
    rol: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    }
}, { tableName: 'usuarios' });
exports.default = Usuario;
