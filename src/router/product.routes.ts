import {Router} from 'express';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { createProduct, getAllProduct, updateProduct } from '../controller/product.controller';
const router:Router=Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('ownerName'),
    createProduct
);

router.post('/getallProduct',
    basicAuthUser,
    getAllProduct
);

router.post('/updateProduct',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateProduct
);



export default router;