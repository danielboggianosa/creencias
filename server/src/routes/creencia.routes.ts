import {Router} from 'express';
import creenciaController from '../controllers/creencia.controller';
import tokenSecure from '../middlewares/token.middleware';

class CreenciaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', tokenSecure.proteger, creenciaController.create)
        this.router.post('/bulk', tokenSecure.proteger, creenciaController.bulkCreate)
        this.router.post('/list', tokenSecure.proteger, creenciaController.readAll)
        this.router.get('/:id', tokenSecure.proteger, creenciaController.readOne)
        this.router.put('/:id', tokenSecure.proteger, creenciaController.update)
        this.router.delete('/:id', tokenSecure.proteger, creenciaController.delete)
    }
}
const creenciaRoutes = new CreenciaRoutes();
export default creenciaRoutes.router;