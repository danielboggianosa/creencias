import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import bcrypt from 'bcrypt';
// import mailSender from '../middlewares/mail.sender';

class AuthController {
    
    //LOGIN 1
    public async authenticate (req: Request, res: Response): Promise<any> {
        const {correo, password} = req.body;
        await Usuario.findOne({where:{correo}})
        .then(
            (user:any) => {
                if(user){
                    bcrypt.compare(password, user.dataValues.password, (err,result)=>{
                        if(result)
                            res.json({
                                success: true,
                                message: "autorizado", 
                                user:{
                                    nombre: user.dataValues.nombre, apellido:user.dataValues.apellido, correo: user.dataValues.correo, imagen: user.dataValues.imagen
                                }
                            });
                        else
                            res.json({msg: "correo o password incorrecto"});
                    })
                }
                else
                    res.json({msg: "correo no registrado"});
            }
        )
        .catch(
            (err:any) => res.json(err)
        );
    }

    // REGISTER USER 1
    public async register (req: Request, res: Response): Promise<any>{
        const {nombre, apellido, correo, password, imagen} = req.body;
        await bcrypt.hash(password, 10, (err, hash) => {
            if(hash){
                var newUser = {
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    password: hash,
                    rol: 5,
                    imagen: "http://138.197.196.196/api/imagenes/18.jpg"
                }
                Usuario.create(newUser)
                    .then((user:any)=>{
                        res.json({msg: "Usuario Creado Correctamente", user: {
                            id: user.id,
                            nombre: user.nombre,
                            apellido: user.apellido,
                            correo: user.correo,
                            rol: user.rol,
                            imagen: user.imagen
                        }})
                    })
                    .catch((error:any)=>{
                        res.json({msg: error})
                    })
            }
            if(err) throw err;
        })
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
    public async reset(req: Request, res: Response): Promise<void> {
        const {correo, password} = req.body;
        bcrypt.hash(password,10,hash=>{
            Usuario.update({password: hash}, { where:{correo} })
            .then(
                (user:any)=>{
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
                }
            )
            .catch( (err: any) => console.log(err) )
        })

    }

}

const authController = new AuthController();
export default authController;