"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config_1.default.name, config_1.default.user, config_1.default.pass, config_1.default.connection);
exports.default = sequelize;
