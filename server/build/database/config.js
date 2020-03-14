"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../env"));
exports.default = {
    name: env_1.default.database.name,
    user: env_1.default.database.user,
    pass: env_1.default.database.pass,
    connection: {
        host: env_1.default.database.host,
        logging: false,
        dialect: "mysql",
        dialectOptions: {
            timezone: '-05:00'
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            paranoid: true
        }
    }
};
