import bcrypt, { hash } from 'bcrypt'
import { reject, resolve } from 'bluebird';
import env from '../env';

class CryptoSecure {

    public encriptar(password:string){
        return new Promise((resolve,reject) => {
            bcrypt.hash(password,env.hash_rounds,(err,hash)=>{
                if(hash) resolve(hash)
                else reject(err)
            })
        })
    }

    public comparar(password:string, hashed:string){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,hashed,(err,res)=>{
                if(res) resolve(res)
                else reject('password mismatch')
            })
        })
    }

}
const cryptoSecure = new CryptoSecure();
export default cryptoSecure;