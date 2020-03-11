"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const objetivo_controller_1 = __importDefault(require("../controllers/objetivo.controller"));
class ObjetivoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', objetivo_controller_1.default.create);
        this.router.post('/asociar', objetivo_controller_1.default.asociar);
        this.router.get('/:id', objetivo_controller_1.default.readOne);
        this.router.get('/', objetivo_controller_1.default.readAll);
        this.router.get('/:id/asociado', objetivo_controller_1.default.asociado);
        this.router.put('/', objetivo_controller_1.default.update);
        this.router.delete('/:id', objetivo_controller_1.default.delete);
    }
}
const objetivoRoutes = new ObjetivoRoutes();
exports.default = objetivoRoutes.router;
