import {Router} from 'express';
import objetivoController from '../controllers/objetivo.controller';
import tokenSecure from '../middlewares/token.middleware';

class ObjetivoRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', tokenSecure.proteger, objetivoController.create)
        this.router.post('/bulk', tokenSecure.proteger, objetivoController.bulkCreate)
        this.router.post('/:id/asociar', tokenSecure.proteger, objetivoController.asociar)
        this.router.post('/list', tokenSecure.proteger, objetivoController.readAll)
        this.router.get('/:id', tokenSecure.proteger, objetivoController.readOne)
        this.router.get('/:id/asociado', tokenSecure.proteger, objetivoController.asociado)
        this.router.put('/', tokenSecure.proteger, objetivoController.update)
        this.router.delete('/:id', tokenSecure.proteger, objetivoController.delete)
    }
}
const objetivoRoutes = new ObjetivoRoutes();
export default objetivoRoutes.router;