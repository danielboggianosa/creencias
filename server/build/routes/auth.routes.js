"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const token_middleware_1 = __importDefault(require("../middlewares/token.middleware"));
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', auth_controller_1.default.authenticate);
        this.router.post('/register', auth_controller_1.default.register);
        this.router.post('/recover', token_middleware_1.default.proteger, auth_controller_1.default.recover);
        this.router.post('/reset', auth_controller_1.default.reset);
        this.router.get('/validate', token_middleware_1.default.proteger, auth_controller_1.default.validate);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
