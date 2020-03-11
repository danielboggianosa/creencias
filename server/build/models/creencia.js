"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = __importDefault(require("sequelize"));
const Creencia = connection_1.default.define('creencia', {
    creencia: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
}, { tableName: 'creencias' });
exports.default = Creencia;
