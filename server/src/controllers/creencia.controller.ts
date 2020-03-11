import {Request, Response} from 'express';
import Creencia from '../models/creencia';

class CreenciaController{
    
    
    //CREATE
    public async create(req:Request, res:Response): Promise<void>{
        await Creencia.create(req.body)
        .then((creencia: any)=>{
            res.json({
                success: true, 
                message: 'Creencia creada correctamente', 
                data: creencia
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
        await Creencia.bulkCreate(req.body)
        .then((creencias: any)=>{
            res.json({
                success: true, 
                message: 'Creencias creadas correctamente', 
                data: creencias
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
        await Creencia.findOne({where: {id}})
        .then((creencia: any)=>{
            res.json({
                success:true, 
                message: 'Creencia encontrada',
                data: creencia
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
        await Creencia.findAll()
        .then((creencia: any)=>{
            res.json({
                success:true, 
                message: 'Creencias encontradas',
                data: creencia
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
        await Creencia.update(req.body, {where: {id}})
        .then((creencia: any)=>{
            res.json({
                success: true, 
                message: 'Creencia actualizada correctamente', 
                data: creencia
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
    
    //DELTE
    public async delete(req:Request, res:Response): Promise<void>{
        const { id } = req.params
        await Creencia.destroy({where: {id}})
        .then((creencia: any)=>{
            res.json({
                success:true, 
                message: 'Creencia borrada',
                data: creencia
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
const creenciaController = new CreenciaController();
export default creenciaController;