"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = __importDefault(require("../env"));
class CryptoSecure {
    encriptar(password) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.hash(password, env_1.default.hash_rounds, (err, hash) => {
                if (hash)
                    resolve(hash);
                else
                    reject(err);
            });
        });
    }
    comparar(password, hashed) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(password, hashed, (err, res) => {
                if (res)
                    resolve(res);
                else
                    reject('password mismatch');
            });
        });
    }
}
const cryptoSecure = new CryptoSecure();
exports.default = cryptoSecure;
