"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../../env"));
class TokenSecure {
    constructor() {
        // "env" esta es un variable guardada en un archivo secreto, puedes cambiarla por la que tú desees
        this.secret = env_1.default.jwt_secret;
    }
    generar(data) {
        return new Promise((resolve, reject) => {
            const token = jsonwebtoken_1.default.sign(data, this.secret, { expiresIn: '5h' });
            if (token)
                resolve(token);
            else
                reject('no se pudo generar el token');
        });
    }
    proteger(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, this.secret, (err, data) => {
                if (data)
                    next();
                else
                    res.sendStatus(403);
            });
        }
        else
            res.sendStatus(403);
    }
}
const tokenSecure = new TokenSecure();
exports.default = tokenSecure;
