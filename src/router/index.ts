import { Router } from 'express';
const router: Router = Router();

import User from './user.router'; 
import Login from './login.router';
import Owner from './owner.routes';
import Store from './store.routes';
import productOwner from './productowner.routes';
import product from './product.routes'

router.use('/users', User)
router.use('/login',Login)
router.use('/owner',Owner)
router.use('/store',Store)
router.use('/productowner',productOwner)
router.use('/product',product)


export default router;