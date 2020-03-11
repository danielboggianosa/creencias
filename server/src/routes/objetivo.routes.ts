import {Router} from 'express';
import objetivoController from '../controllers/objetivo.controller';

class ObjetivoRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', objetivoController.create)
        this.router.post('/asociar', objetivoController.asociar)
        this.router.get('/:id', objetivoController.readOne)
        this.router.get('/', objetivoController.readAll)
        this.router.get('/:id/asociado', objetivoController.asociado)
        this.router.put('/', objetivoController.update)
        this.router.delete('/:id', objetivoController.delete)
    }
}
const objetivoRoutes = new ObjetivoRoutes();
export default objetivoRoutes.router;