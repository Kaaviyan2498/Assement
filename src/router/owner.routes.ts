import {Router} from 'express';
import { ownerProfile } from '../controller/owner.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    ownerProfile
);


export default router;