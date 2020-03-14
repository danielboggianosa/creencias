import nodemailer from 'nodemailer'
import tokenSecure from './token.middleware';
import env from '../env';

class MailSender {

    transporter:any;
    server={
        correo: process.env.server_correo, // en este caso correo está configurada con una variable de entorno
        pass: process.env.server_pass, // en este caso la contraseña está configurada con una variable de entorno
    }

    constructor(){
        this.config();
    }

    config(){
        this.transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: env.mailServer.correo,
                pass: env.mailServer.pass
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
    
    async recoverPass(correo:string){
        await tokenSecure.generar({correo})
        .then(token => {
            let message={
                from: this.server.correo,
                to: correo,
                subject: 'Recuperar Contraseña',
                html: 'Hola, has solicitado recuperar tu contraseña. Para recuperarla ve al siguiente enlace: <a href="http://localhost:4200/reset/'+token+'">click aquí</a>',            
            }
            this.transporter.sendMail(message)
        })
    }
      

}
const mailSender = new MailSender();
export default mailSender;