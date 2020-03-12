"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "creencias",
    user: "root",
    pass: "",
    connection: {
        host: "localhost",
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
