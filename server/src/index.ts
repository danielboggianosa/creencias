import express from 'express';
import {Application} from 'express-serve-static-core'
import morgan from 'morgan';
import cors from 'cors';
import objetivoRoutes from './routes/objetivo.routes';
import creenciaRoutes from './routes/creencia.routes';
import authRoutes from './routes/auth.routes'
import db_init from './database/setup';

class Server {

    public app: Application;
    
    constructor(){
        this.app = express()
        this.config()
        this.routes()
        this.db_config()
    }

    config(){
        this.app.set('port', 4500);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes():void{
        this.app.use('/api/objetivo', objetivoRoutes);
        this.app.use('/api/creencia', creenciaRoutes);
        this.app.use('/api/auth', authRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'), ()=>console.log('Servidor en el puerto', this.app.get('port')))
    }

    db_config():void{
        db_init;
    }

}
const server = new Server();
server.start();