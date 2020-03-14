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
const usuario_1 = __importDefault(require("../models/usuario"));
const crypto_middleware_1 = __importDefault(require("../middlewares/crypto.middleware."));
class UsuarioController {
    //CREATE
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield usuario_1.default.create(req.body)
                .then((usuario) => {
                res.json({
                    success: true,
                    message: 'Usuario creado correctamente',
                    data: usuario
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
            yield usuario_1.default.bulkCreate(req.body)
                .then((usuarios) => {
                res.json({
                    success: true,
                    message: 'Usuarios creados correctamente',
                    data: usuarios
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
            yield usuario_1.default.findOne({ where: { id } })
                .then((usuario) => {
                res.json({
                    success: true,
                    message: 'Usuario encontrado',
                    data: usuario
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
                        { usuario: { [Op.substring]: value } }
                    ]
                };
            }
            let total = yield usuario_1.default.count({ where });
            yield usuario_1.default.findAll({
                attributes: attributes,
                where,
                order: [[field, order]],
                offset: page,
                limit: size
            })
                .then((usuario) => {
                res.json({
                    success: true,
                    message: 'Usuarios encontrados',
                    total: total,
                    data: usuario
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
            yield usuario_1.default.update(req.body, { where: { id } })
                .then((usuario) => {
                res.json({
                    success: true,
                    message: 'Usuario actualizado correctamente',
                    data: usuario
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
    //UPDATE PASSWORD
    updatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { password, newPass } = req.body;
            let hashed;
            yield usuario_1.default.findOne({ where: { id } })
                .then((user) => {
                crypto_middleware_1.default.comparar(password, user.dataValues.password)
                    .catch(() => res.json({ success: false, message: 'La contraseña es incorrecta' }));
            });
            yield crypto_middleware_1.default.encriptar(newPass)
                .then(hash => hashed = hash);
            yield usuario_1.default.update({ password: hashed }, { where: { id } })
                .then((usuario) => {
                res.json({
                    success: true,
                    message: 'Contraseña actualizada correctamente, por favor vuelve a iniciar sesión',
                    data: usuario
                });
            })
                .catch((error) => {
                res.json({
                    success: false,
                    message: 'Hubo un problema al actualizar',
                    error: error
                });
            });
        });
    }
    //DELETE
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield usuario_1.default.destroy({ where: { id } })
                .then((usuario) => {
                res.json({
                    success: true,
                    message: 'Usuario borrada',
                    data: usuario
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
const usuarioController = new UsuarioController();
exports.default = usuarioController;
