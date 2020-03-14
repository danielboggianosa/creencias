import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
import env from '../env'

class TokenSecure {
    // "env" esta es un variable guardada en un archivo secreto, puedes cambiarla por la que tú desees
    secret:string = env.jwt_secret 

    public generar(data:object){
        return new Promise((resolve,reject)=>{
            const secret:string = env.jwt_secret 
            const token = jwt.sign(data, secret, {expiresIn: '5h'});
            if(token) resolve(token)
            else reject('no se pudo generar el token')
        })
    }

    public proteger(req: Request, res: Response, next: NextFunction){
        const secret:string = env.jwt_secret 
        const bearerHeader = req.headers['authorization'];
        console.log('my Secret', secret)
        if( typeof bearerHeader !== 'undefined'){
            const token = bearerHeader.split(' ')[1]
            jwt.verify(token, secret, (err,data)=>{
                if(data) next();
                else res.sendStatus(403)
            })
        }
        else res.sendStatus(403)
    }
}

const tokenSecure = new TokenSecure();
export default tokenSecure;