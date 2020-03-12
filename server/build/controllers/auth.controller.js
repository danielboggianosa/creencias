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
const bcrypt_1 = __importDefault(require("bcrypt"));
// import mailSender from '../middlewares/mail.sender';
class AuthController {
    //LOGIN 1
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            yield usuario_1.default.findOne({ where: { correo } })
                .then((user) => {
                if (user) {
                    bcrypt_1.default.compare(password, user.dataValues.password, (err, result) => {
                        if (result)
                            res.json({
                                success: true,
                                message: "autorizado",
                                user: {
                                    nombre: user.dataValues.nombre, apellido: user.dataValues.apellido, correo: user.dataValues.correo, imagen: user.dataValues.imagen
                                }
                            });
                        else
                            res.json({ msg: "correo o password incorrecto" });
                    });
                }
                else
                    res.json({ msg: "correo no registrado" });
            })
                .catch((err) => res.json(err));
        });
    }
    // REGISTER USER 1
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido, correo, password, imagen } = req.body;
            yield bcrypt_1.default.hash(password, 10, (err, hash) => {
                if (hash) {
                    var newUser = {
                        nombre: nombre,
                        apellido: apellido,
                        correo: correo,
                        password: hash,
                        rol: 5,
                        imagen: "http://138.197.196.196/api/imagenes/18.jpg"
                    };
                    usuario_1.default.create(newUser)
                        .then((user) => {
                        res.json({ msg: "Usuario Creado Correctamente", user: {
                                id: user.id,
                                nombre: user.nombre,
                                apellido: user.apellido,
                                correo: user.correo,
                                rol: user.rol,
                                imagen: user.imagen
                            } });
                    })
                        .catch((error) => {
                        res.json({ msg: error });
                    });
                }
                if (err)
                    throw err;
            });
        });
    }
    // RECOVER PASSWORD
    /* public async recover(req: Request, res: Response): Promise<void> {
        const {correo} = req.body;
        await Usuario.findOne({where:{correo}})
            .then(
                (user:any)=>{
                    if(user){
                        mailSender.recoverPass(correo);
                        res.json({success:true,msg: "correo enviado con éxito"});
                    }
                    else
                        res.json({success:false,msg: "correo no registrado"});
                }
            )
            .catch( (err: any) => console.log(err) )
    } */
    // RESET PASSWORD
    reset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            bcrypt_1.default.hash(password, 10, hash => {
                usuario_1.default.update({ password: hash }, { where: { correo } })
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
        });
    }
}
const authController = new AuthController();
exports.default = authController;
