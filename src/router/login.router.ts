import {Router} from 'express';
import { userLogin, verifyOtp } from '../controller/login.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/loginuser',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    userLogin
);

router.post ('/verifyOtp',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    checkRequestBodyParams('otp'),
    verifyOtp);


export default router;