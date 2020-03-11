"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creencia_controller_1 = __importDefault(require("../controllers/creencia.controller"));
class CreenciaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', creencia_controller_1.default.create);
        this.router.get('/:id', creencia_controller_1.default.readOne);
        this.router.get('/', creencia_controller_1.default.readAll);
        this.router.put('/:id', creencia_controller_1.default.update);
        this.router.delete('/:id', creencia_controller_1.default.delete);
    }
}
const creenciaRoutes = new CreenciaRoutes();
exports.default = creenciaRoutes.router;
