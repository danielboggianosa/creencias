import {Request, Response} from 'express';
import Objetivo from '../models/objetivo';
import Creencia from '../models/creencia';

class ObjetivoController{
    
    
    //CREATE
    public async create(req:Request, res:Response): Promise<void>{
        await Objetivo.create(req.body)
        .then((objetivo: any)=>{
            res.json({success: true, message: 'Objetivo creado correctamente', data: objetivo});
        })
        .catch((error: any)=>{
            res.json({success:false, message: 'Hubo un problema al crear', error: error})
        })
    }
    
    //CREATE BULK
    public async bulkCreate(req:Request, res:Response): Promise<void>{
        await Objetivo.bulkCreate(req.body)
        .then((objetivo: any)=>{
            res.json({success: true, message: 'Objetivos creados correctamente', data: objetivo});
        })
        .catch((error: any)=>{
            res.json({success:false, message: 'Hubo un problema al crear', error: error})
        })
    }

    //ASOCIAR OBJETIVOS CON CREENCIAS
    public async asociar(req:Request, res:Response): Promise<void>{
        const {id} = req.params
        const {Creencias} = req.body
        await Objetivo.findOne({where:{id}})
        .then((objetivo: any)=>{
            objetivo.addCreencias(Creencias)
            .then((ob: any)=>{
                res.json({
                    success:true,
                    message:"Creencias asociadas correctamente",
                    data: ob
                })
            })
            .catch((error:any)=>{
                res.json({
                    success:false,
                    message:"Ocurrió algún error al asociar",
                    data: error
                })
            })
        })
        .catch((error:any)=>{
            res.json({
                success:false,
                message:"Ocurrió algún error al encontrar",
                data: error
            })
        })
    }
    
    //READ ONE
    public async readOne(req:Request, res:Response): Promise<void>{
        const { id } = req.params
        await Objetivo.findOne({where: {id}})
        .then((objetivo: any)=>{
            res.json({
                success:true, 
                message: 'Objetivo encontrado',
                data: objetivo
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
                { nombre: { [Op.substring]: value } },
                { apellido: { [Op.substring]: value } },
                { correo: { [Op.substring]: value } }
              ]
          }
        }
        let total = await Objetivo.count({where});
        await Objetivo.findAll({
            attributes: attributes,
            where,
            order:[ [field, order] ],
            offset: page, 
            limit: size
        })
        .then((objetivo: any)=>{
            res.json({
                success:true, 
                message: 'Objetivos encontrados',
                data: objetivo
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

    //READ ALL WITH ASOCIATIONS
    public async asociado(req:Request, res:Response): Promise<void>{
        const {id} = req.params
        await Objetivo.findOne({where:{id},include:[{model: Creencia, as: 'Creencias'}]})
        .then((objetivo: any)=>{
            res.json({
                success:true, 
                message: 'Objetivos encontrados',
                data: objetivo
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
        await Objetivo.update(req.body, {where: {id}})
        .then((objetivo: any)=>{
            res.json({
                success: true, 
                message: 'Objetivo actualizada correctamente', 
                data: objetivo
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
        await Objetivo.destroy({where: {id}})
        .then((objetivo: any)=>{
            res.json({
                success:true, 
                message: 'Objetivo borrada',
                data: objetivo
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
const objetivoController = new ObjetivoController();
export default objetivoController;