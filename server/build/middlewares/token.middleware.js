"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenSecure {
    generar(data) {
        return new Promise((resolve, reject) => {
            const token = jsonwebtoken_1.default.sign({ data }, 'tu_vieja_calata');
            if (token)
                resolve(token);
            else
                reject('no se pudo generar el token');
        });
    }
}
const tokenSecure = new TokenSecure();
exports.default = tokenSecure;
