import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import cryptoSecure from '../middlewares/crypto.middleware.';
import tokenSecure from '../middlewares/token.middleware';
import mailSender from '../middlewares/mail.sender';

class AuthController {
    
    //LOGIN 1
    public async authenticate (req: Request, res: Response): Promise<any> {
        const {correo, password} = req.body;
        await Usuario.findOne({where:{correo}})
        .then((user:any) => {
            if(user){
                cryptoSecure.comparar(password, user.dataValues.password)
                .then((result)=>{
                    const usuario={
                        nombre: user.dataValues.nombre, 
                        apellido:user.dataValues.apellido, 
                        correo: user.dataValues.correo, 
                        imagen: user.dataValues.imagen,
                        rol: user.dataValues.rol
                    }
                    tokenSecure.generar(usuario)
                    .then(token=>{
                        res.json({
                            success: true,
                            message: 'autorizado',                        
                            token: token
                        })
                    })
                    .catch((err)=>res.json({success:false,message:err}))
                    
                })
                .catch(()=>res.json({success:false,message:'correo o contraseña no coinciden'}))
                
            }
            else
                res.json({success:false,message: "usuario no registrado"});
        })
        .catch(
            (err:any) => res.json({success:false,message:err})
        );
    }

    // REGISTER USER 1
    public async register (req: Request, res: Response): Promise<any>{
        const {nombre, apellido, correo, password, imagen} = req.body;
        let newUser;
        let token;
        await cryptoSecure.encriptar(password)
            .then(hash=>{
                newUser = {
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    password: hash,
                    rol: 5,
                    imagen: (imagen) ? imagen : "http://138.197.196.196/api/imagenes/18.jpg"
                }
            })
            .catch(error=>res.json({success:false,message:error}))
        await Usuario.create(newUser)
            .then((user:any)=>{
                res.json({success:true, message: "Usuario Creado Correctamente", user: {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    correo: user.correo,
                    rol: user.rol,
                    imagen: user.imagen
                }})
            })
            .catch((error:any)=>{
                res.json({success:false,message: error})
            })
    }

    // RECOVER PASSWORD
    public async recover(req: Request, res: Response): Promise<void> {
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
    }

    // RESET PASSWORD
    public async reset(req: Request, res: Response): Promise<void> {
        const {correo, password} = req.body;
        let hashed;
        await cryptoSecure.encriptar(password)
            .then(hash=>hashed=hash)
            .catch(error=>res.json({success:false,message:error}))
        await Usuario.update({password: hashed}, { where:{correo} })
            .then((user:any)=>{
                    if(user){
                        res.json({success:true, user: {
                            id: user.id,
                            nombre: user.nombre,
                            apellido: user.apellido,
                            correo: user.correo,
                            rol: user.rol,
                            imagen: user.imagen
                        }});
                    }
                    else
                        res.json({success:false,msg: "correo no registrado"});
            })
            .catch( (err: any) => console.log(err) )
    }

    // VALIDAR TOKEN
    public async validate(req: Request, res: Response): Promise<void>{
        res.json(true)
    }

}

const authController = new AuthController();
export default authController;