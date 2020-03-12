import {Router} from 'express';
import creenciaController from '../controllers/creencia.controller';

class CreenciaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', creenciaController.create)
        this.router.post('/bulk', creenciaController.bulkCreate)
        this.router.get('/:id', creenciaController.readOne)
        this.router.get('/', creenciaController.readAll)
        this.router.put('/:id', creenciaController.update)
        this.router.delete('/:id', creenciaController.delete)
    }
}
const creenciaRoutes = new CreenciaRoutes();
export default creenciaRoutes.router;