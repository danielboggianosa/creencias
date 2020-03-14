"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const token_middleware_1 = __importDefault(require("./token.middleware"));
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
                user: this.server.correo,
                pass: this.server.pass
            }
        });
        // verify connection configuration
        this.transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Server is ready to take our messages");
            }
        });
    }
    recoverPass(correo) {
        let token = token_middleware_1.default.generar({ correo });
        let message = {
            from: this.server.correo,
            to: correo,
            subject: 'Recuperar Contraseña',
            text: 'Para recuperar ve al siguiente enlace: <a href="http://localhost:4200/reset/' + token + '">click aquí</a>',
        };
        this.transporter.sendMail(message);
    }
}
const mailSender = new MailSender();
exports.default = mailSender;
