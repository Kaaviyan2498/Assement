import { Router } from 'express';
import{ userProfile } from '../controller/user.controller'
import { checkParam, checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();
// 
router.post('/', // create user
    basicAuthUser,
    checkRequestBodyParams('email'),
    userProfile
);

export default router