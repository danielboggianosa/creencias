import jwt from 'jsonwebtoken'
import { resolve, reject } from 'bluebird';

class TokenSecure {

    public generar(data:object){
        return new Promise((resolve,reject)=>{
            const token = jwt.sign({data}, 'tu_vieja_calata');
            if(token) resolve(token)
            else reject('no se pudo generar el token')
        })
    }
}

const tokenSecure = new TokenSecure();
export default tokenSecure;