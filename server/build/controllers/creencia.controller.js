"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const creencia_1 = __importDefault(require("../models/creencia"));
class CreenciaController {
    //CREATE
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield creencia_1.default.create(req.body)
                .then((creencia) => {
                res.json({
                    success: true,
                    message: 'Creencia creada correctamente',
                    data: creencia
                });
            })
                .catch((error) => {
                res.json({
                    success: false,
                    message: 'Hubo un problema al crear',
                    error: error
                });
            });
        });
    }
    //CREATE BULK
    bulkCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield creencia_1.default.bulkCreate(req.body)
                .then((creencias) => {
                res.json({
                    success: true,
                    message: 'Creencias creadas correctamente',
                    data: creencias
                });
            })
                .catch((error) => {
                res.json({
                    success: false,
                    message: 'Hubo un problema al crear',
                    error: error
                });
            });
        });
    }
    //READ ONE
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield creencia_1.default.findOne({ where: { id } })
                .then((creencia) => {
                res.json({
                    success: true,
                    message: 'Creencia encontrada',
                    data: creencia
                });
            })
                .catch((error) => {
                res.json({
                    success: false,
                    message: "Ocurrión un error",
                    error: error
                });
            });
        });
    }
    //READ ALL
    readAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, size, field, order, value, attributes } = req.body;
            const { Op } = require('sequelize');
            var where = null;
            if (value) {
                where = {
                    [Op.or]: [
                        { id: { [Op.substring]: value } },
                        { creencia: { [Op.substring]: value } }
                    ]
                };
            }
            let total = yield creencia_1.default.count({ where });
            yield creencia_1.default.findAll({
                attributes: attributes,
                where,
                order: [[field, order]],
                offset: page,
                limit: size
            })
                .then((creencia) => {
                res.json({
                    success: true,
                    message: 'Creencias encontradas',
                    total: total,
                    data: creencia
                });
            })
                .catch((error) => {
                res.json({
                    success: false,
                    message: "Ocurrión un error",
                    error: error
                });
            });
        });
    }
    //UPDATE
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield creencia_1.default.update(req.body, { where: { id } })
                .then((creencia) => {
                res.json({
                    success: true,
                    message: 'Creencia actualizada correctamente',
                    data: creencia
                });
            })
                .catch((error) => {
                res.json({
                    success: false,
                    message: 'Hubo un problema al crear',
                    error: error
                });
            });
        });
    }
    //DELETE
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield creencia_1.default.destroy({ where: { id } })
                .then((creencia) => {
                res.json({
                    success: true,
                    message: 'Creencia borrada',
                    data: creencia
                });
            })
                .catch((error) => {
                res.json({
                    success: false,
                    message: "Ocurrión un error",
                    error: error
                });
            });
        });
    }
}
const creenciaController = new CreenciaController();
exports.default = creenciaController;
