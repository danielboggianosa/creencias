"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../controllers/usuario.controller"));
const token_middleware_1 = __importDefault(require("../middlewares/token.middleware"));
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', token_middleware_1.default.proteger, usuario_controller_1.default.create);
        this.router.post('/bulk', token_middleware_1.default.proteger, usuario_controller_1.default.bulkCreate);
        this.router.post('/list', token_middleware_1.default.proteger, usuario_controller_1.default.readAll);
        this.router.get('/:id', token_middleware_1.default.proteger, usuario_controller_1.default.readOne);
        this.router.put('/:id', token_middleware_1.default.proteger, usuario_controller_1.default.update);
        this.router.put('/:id/pass', token_middleware_1.default.proteger, usuario_controller_1.default.updatePass);
        this.router.delete('/:id', token_middleware_1.default.proteger, usuario_controller_1.default.delete);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
