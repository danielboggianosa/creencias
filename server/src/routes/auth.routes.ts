import { Router } from 'express';
import authController from '../controllers/auth.controller';
import tokenSecure from '../middlewares/token.middleware';

class AuthRoutes {
    
    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config(): void {
        this.router.post('/login', authController.authenticate);
        this.router.post('/register', authController.register);
        this.router.post('/recover', tokenSecure.proteger, authController.recover);
        this.router.post('/reset', authController.reset);
        this.router.get('/validate', tokenSecure.proteger, authController.validate);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;