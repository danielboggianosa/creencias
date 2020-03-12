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
const objetivo_1 = __importDefault(require("../models/objetivo"));
const creencia_1 = __importDefault(require("../models/creencia"));
class ObjetivoController {
    //CREATE
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield objetivo_1.default.create(req.body)
                .then((objetivo) => {
                res.json({ success: true, message: 'Objetivo creado correctamente', data: objetivo });
            })
                .catch((error) => {
                res.json({ success: false, message: 'Hubo un problema al crear', error: error });
            });
        });
    }
    //CREATE BULK
    bulkCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield objetivo_1.default.bulkCreate(req.body)
                .then((objetivo) => {
                res.json({ success: true, message: 'Objetivos creados correctamente', data: objetivo });
            })
                .catch((error) => {
                res.json({ success: false, message: 'Hubo un problema al crear', error: error });
            });
        });
    }
    //ASOCIAR OBJETIVOS CON CREENCIAS
    asociar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { creencias } = req.body;
            yield objetivo_1.default.findOne({ where: { id } })
                .then((objetivo) => {
                objetivo.addCreencias(creencias)
                    .then((ob) => {
                    res.json({
                        success: true,
                        message: "Creencias asociadas correctamente",
                        data: ob
                    });
                })
                    .catch((error) => {
                    res.json({
                        success: false,
                        message: "Ocurrió algún error al asociar",
                        data: error
                    });
                });
            })
                .catch((error) => {
                res.json({
                    success: false,
                    message: "Ocurrió algún error al encontrar",
                    data: error
                });
            });
        });
    }
    //READ ONE
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield objetivo_1.default.findOne({ where: { id } })
                .then((objetivo) => {
                res.json({
                    success: true,
                    message: 'Objetivo encontrado',
                    data: objetivo
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
                        { objetivo: { [Op.substring]: value } }
                    ]
                };
            }
            let total = yield objetivo_1.default.count({ where });
            yield objetivo_1.default.findAll({
                attributes: attributes,
                where,
                order: [[field, order]],
                offset: page,
                limit: size
            })
                .then((objetivo) => {
                res.json({
                    success: true,
                    message: 'Objetivos encontrados',
                    total: total,
                    data: objetivo
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
    //READ ALL WITH ASOCIATIONS
    asociado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield objetivo_1.default.findOne({ where: { id }, include: [{ model: creencia_1.default, as: 'Creencias' }] })
                .then((objetivo) => {
                res.json({
                    success: true,
                    message: 'Objetivos encontrados',
                    data: objetivo
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
            yield objetivo_1.default.update(req.body, { where: { id } })
                .then((objetivo) => {
                res.json({
                    success: true,
                    message: 'Objetivo actualizada correctamente',
                    data: objetivo
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
    //DELTE
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield objetivo_1.default.destroy({ where: { id } })
                .then((objetivo) => {
                res.json({
                    success: true,
                    message: 'Objetivo borrado',
                    data: objetivo
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
const objetivoController = new ObjetivoController();
exports.default = objetivoController;
