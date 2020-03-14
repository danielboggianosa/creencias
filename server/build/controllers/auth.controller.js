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
const token_middleware_1 = __importDefault(require("../middlewares/token.middleware"));
const mail_sender_1 = __importDefault(require("../middlewares/mail.sender"));
class AuthController {
    //LOGIN 1
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            yield usuario_1.default.findOne({ where: { correo } })
                .then((user) => {
                if (user) {
                    crypto_middleware_1.default.comparar(password, user.dataValues.password)
                        .then((result) => {
                        const usuario = {
                            nombre: user.dataValues.nombre,
                            apellido: user.dataValues.apellido,
                            correo: user.dataValues.correo,
                            imagen: user.dataValues.imagen,
                            rol: user.dataValues.rol
                        };
                        token_middleware_1.default.generar(usuario)
                            .then(token => {
                            res.json({
                                success: true,
                                message: 'autorizado',
                                token: token
                            });
                        })
                            .catch((err) => res.json({ success: false, message: err }));
                    })
                        .catch(() => res.json({ success: false, message: 'correo o contraseña no coinciden' }));
                }
                else
                    res.json({ success: false, message: "usuario no registrado" });
            })
                .catch((err) => res.json({ success: false, message: err }));
        });
    }
    // REGISTER USER 1
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido, correo, password, imagen } = req.body;
            let newUser;
            let token;
            yield crypto_middleware_1.default.encriptar(password)
                .then(hash => {
                newUser = {
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    password: hash,
                    rol: 5,
                    imagen: (imagen) ? imagen : "http://138.197.196.196/api/imagenes/18.jpg"
                };
            })
                .catch(error => res.json({ success: false, message: error }));
            yield usuario_1.default.create(newUser)
                .then((user) => {
                res.json({ success: true, message: "Usuario Creado Correctamente", user: {
                        id: user.id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        correo: user.correo,
                        rol: user.rol,
                        imagen: user.imagen
                    } });
            })
                .catch((error) => {
                res.json({ success: false, message: error });
            });
        });
    }
    // RECOVER PASSWORD
    recover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo } = req.body;
            yield usuario_1.default.findOne({ where: { correo } })
                .then((user) => {
                if (user) {
                    mail_sender_1.default.recoverPass(correo);
                    res.json({ success: true, msg: "correo enviado con éxito" });
                }
                else
                    res.json({ success: false, msg: "correo no registrado" });
            })
                .catch((err) => console.log(err));
        });
    }
    // RESET PASSWORD
    reset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            let hashed;
            yield crypto_middleware_1.default.encriptar(password)
                .then(hash => hashed = hash)
                .catch(error => res.json({ success: false, message: error }));
            yield usuario_1.default.update({ password: hashed }, { where: { correo } })
                .then((user) => {
                if (user) {
                    res.json({ success: true, user: {
                            id: user.id,
                            nombre: user.nombre,
                            apellido: user.apellido,
                            correo: user.correo,
                            rol: user.rol,
                            imagen: user.imagen
                        } });
                }
                else
                    res.json({ success: false, msg: "correo no registrado" });
            })
                .catch((err) => console.log(err));
        });
    }
    // VALIDAR TOKEN
    validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(true);
        });
    }
}
const authController = new AuthController();
exports.default = authController;
