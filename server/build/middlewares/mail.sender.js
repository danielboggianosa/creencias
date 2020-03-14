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
const nodemailer_1 = __importDefault(require("nodemailer"));
const token_middleware_1 = __importDefault(require("./token.middleware"));
const env_1 = __importDefault(require("../env"));
class MailSender {
    constructor() {
        this.server = {
            correo: process.env.server_correo,
            pass: process.env.server_pass,
        };
        this.config();
    }
    config() {
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
                user: env_1.default.mailServer.correo,
                pass: env_1.default.mailServer.pass
            }
        });
        // verify connection configuration
        /* this.transporter.verify(function(error: any, success: any) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        }); */
    }
    recoverPass(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield token_middleware_1.default.generar({ correo })
                .then(token => {
                let message = {
                    from: this.server.correo,
                    to: correo,
                    subject: 'Recuperar Contraseña',
                    html: 'Hola, has solicitado recuperar tu contraseña. Para recuperarla ve al siguiente enlace: <a href="http://localhost:4200/reset/' + token + '">click aquí</a>',
                };
                this.transporter.sendMail(message);
            });
        });
    }
}
const mailSender = new MailSender();
exports.default = mailSender;
