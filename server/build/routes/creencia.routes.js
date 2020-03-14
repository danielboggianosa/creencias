"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creencia_controller_1 = __importDefault(require("../controllers/creencia.controller"));
const token_middleware_1 = __importDefault(require("../middlewares/token.middleware"));
class CreenciaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', token_middleware_1.default.proteger, creencia_controller_1.default.create);
        this.router.post('/bulk', token_middleware_1.default.proteger, creencia_controller_1.default.bulkCreate);
        this.router.post('/list', token_middleware_1.default.proteger, creencia_controller_1.default.readAll);
        this.router.get('/:id', token_middleware_1.default.proteger, creencia_controller_1.default.readOne);
        this.router.put('/:id', token_middleware_1.default.proteger, creencia_controller_1.default.update);
        this.router.delete('/:id', token_middleware_1.default.proteger, creencia_controller_1.default.delete);
    }
}
const creenciaRoutes = new CreenciaRoutes();
exports.default = creenciaRoutes.router;
