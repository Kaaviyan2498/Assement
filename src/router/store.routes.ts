import {Router} from 'express';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { createStore, getAllStore, updateStore } from '../controller/store.controller';
const router:Router=Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('ownerName'),
    createStore
);

router.post('/getallStore',
    basicAuthUser,
    getAllStore
);

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateStore
);


export default router;