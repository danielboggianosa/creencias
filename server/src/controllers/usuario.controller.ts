import {Request, Response} from 'express';
import Usuario from '../models/usuario';
import cryptoSecure from '../middlewares/crypto.middleware.';
import { hash } from 'bcrypt';

class UsuarioController{
    
    
    //CREATE
    public async create(req:Request, res:Response): Promise<void>{
        await Usuario.create(req.body)
        .then((usuario: any)=>{
            res.json({
                success: true, 
                message: 'Usuario creado correctamente', 
                data: usuario
            });
        })
        .catch((error: any)=>{
            res.json({
                success:false, 
                message: 'Hubo un problema al crear', 
                error: error
            })
        })
    }

    //CREATE BULK
    public async bulkCreate(req:Request, res:Response): Promise<void>{
        await Usuario.bulkCreate(req.body)
        .then((usuarios: any)=>{
            res.json({
                success: true, 
                message: 'Usuarios creados correctamente', 
                data: usuarios
            });
        })
        .catch((error: any)=>{
            res.json({
                success:false, 
                message: 'Hubo un problema al crear', 
                error: error
            })
        })
    }
    
    //READ ONE
    public async readOne(req:Request, res:Response): Promise<void>{
        const { id } = req.params
        await Usuario.findOne({where: {id}})
        .then((usuario: any)=>{
            res.json({
                success:true, 
                message: 'Usuario encontrado',
                data: usuario
            });
        })
        .catch((error: any)=>{
            res.json({
                success:false,
                message:"Ocurrión un error",
                error: error
            })
        })
    }
    
    //READ ALL
    public async readAll(req:Request, res:Response): Promise<void>{
        const {page, size, field, order, value, attributes} = req.body;
        const { Op } = require('sequelize');
        var where=null;
        if(value){
          where = {
            [Op.or]: [
                { id: { [Op.substring]: value } },
                { usuario: { [Op.substring]: value } }                
              ]
          }
        }
        let total = await Usuario.count({where});
        await Usuario.findAll({
            attributes: attributes,
            where,
            order:[ [field, order] ],
            offset: page, 
            limit: size
        })
        .then((usuario: any)=>{
            res.json({
                success:true, 
                message: 'Usuarios encontrados',
                total: total,
                data: usuario
            });
        })
        .catch((error: any)=>{
            res.json({
                success:false,
                message:"Ocurrión un error",
                error: error
            })
        })
    }
    
    //UPDATE
    public async update(req:Request, res:Response): Promise<void>{
        const  { id } = req.params
        await Usuario.update(req.body, {where: {id}})
        .then((usuario: any)=>{
            res.json({
                success: true, 
                message: 'Usuario actualizado correctamente', 
                data: usuario
            });
        })
        .catch((error: any)=>{
            res.json({
                success:false, 
                message: 'Hubo un problema al crear', 
                error: error
            })
        })
    }
    
    //UPDATE PASSWORD
    public async updatePass(req:Request, res:Response): Promise<void>{
        const { id } = req.params
        const { password, newPass } = req.body
        let hashed
        await Usuario.findOne({where:{id}})
        .then((user:any)=>{
            cryptoSecure.comparar(password, user.dataValues.password)
            .catch(()=>res.json({success:false,message:'La contraseña es incorrecta'}))
        })
        await cryptoSecure.encriptar(newPass)
        .then(hash=> hashed = hash)
        await Usuario.update({password: hashed}, {where: {id}})
        .then((usuario: any)=>{
            res.json({
                success: true, 
                message: 'Contraseña actualizada correctamente, por favor vuelve a iniciar sesión', 
                data: usuario
            });
        })
        .catch((error: any)=>{
            res.json({
                success:false, 
                message: 'Hubo un problema al actualizar', 
                error: error
            })
        })
    }
    
    //DELETE
    public async delete(req:Request, res:Response): Promise<void>{
        const { id } = req.params
        await Usuario.destroy({where: {id}})
        .then((usuario: any)=>{
            res.json({
                success:true, 
                message: 'Usuario borrada',
                data: usuario
            });
        })
        .catch((error: any)=>{
            res.json({
                success:false,
                message:"Ocurrión un error",
                error: error
            })
        })
    }
}
const usuarioController = new UsuarioController();
export default usuarioController;