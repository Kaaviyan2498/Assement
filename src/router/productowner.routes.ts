import {Router} from 'express';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { productOwnerProfile } from '../controller/productOwner.controller';
const router:Router=Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    productOwnerProfile
);


export default router;