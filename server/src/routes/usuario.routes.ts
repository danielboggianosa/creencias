import {Router} from 'express';
import usuarioController from '../controllers/usuario.controller';
import tokenSecure from '../middlewares/token.middleware';

class UsuarioRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', tokenSecure.proteger, usuarioController.create)
        this.router.post('/bulk', tokenSecure.proteger, usuarioController.bulkCreate)
        this.router.post('/list', tokenSecure.proteger, usuarioController.readAll)
        this.router.get('/:id', tokenSecure.proteger, usuarioController.readOne)
        this.router.put('/:id', tokenSecure.proteger, usuarioController.update)
        this.router.put('/:id/pass', tokenSecure.proteger, usuarioController.updatePass)
        this.router.delete('/:id', tokenSecure.proteger, usuarioController.delete)
    }
}
const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;