import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp, sendOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { ProductDocument, Product } from "../model/product.model";
import { Owner } from "../model/owner.model";
import { ProductOwnerDocument } from "src/model/productOwner.model";

var activity = "product"

/**
 * @author Kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create product list .
 */ 

// 1. create api 
export let createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const ownerData = await Product.findOne({ $and: [{ isDeleted: false }, { ownerName: req.body.ownerName }] });
            if (ownerData) {
                const productDetails: ProductOwnerDocument = req.body;
                const createData = new Product(productDetails);
                let insertData = await createData.save();

                const result = {}
                result['_id'] = insertData._id;     
                result['productName'] = insertData.productName;
                result['productOwner'] = insertData.productOwnerName;
                let finalResult = {};
                finalResult["productDetails"] = result;
                response(req, res, activity, 'Level-2', 'create-product', true, 200, finalResult, clientError.success.savedSuccessfully);
                } else {
                    response(req, res, activity, 'Level-3', 'create-product', true, 422, {},"Owner should not be registered");
                }
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'create-product', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'create-product', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all product 
 */
export let getAllProduct = async (req, res, next) => {
    try {
        const userList = await Product.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-product', true, 200, userList, clientError.success.success);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-product', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 * @author Kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update store.
 */
export let updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const productDetails: ProductDocument = req.body;
            const userData = await Product.findOne({ $and: [ { _id: productDetails._id }, { isDeleted: false }] });
            if (userData) {
                const date = new Date(); 
                const updateUser = new Product(productDetails) 
                let insertUser = await updateUser.updateOne({
                    $set: {
                        productOwnerName:productDetails.productOwnerName,
                        productName: productDetails.productName,
                        discountValue:productDetails.discountValue,
                        discountType:productDetails.discountType,
                        originalPrice:productDetails.originalPrice,
                        price:productDetails.price,
                        stock:productDetails.stock,
                        unit:productDetails.unit,           
                        modifiedOn: date,
                        modifiedBy: productDetails.modifiedBy
                    }
                })
                response(req, res, activity, 'Level-2', 'Update-User', true, 200, insertUser, clientError.success.updateSuccess);
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}


/**
 * 
 * @author Kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single User.
 */
export let getSingleProduct = async (req, res, next) => {
    try {
        const single = await Product.findOne({$and:[{isDeleted:false},{ _id: req.body._id }] })
        if (single) {
            response(req, res, activity, 'Level-2', 'Get-User', true, 200, single, clientError.success.fetchedSuccessfully);
        } else {
            response(req, res, activity, 'Level-3', 'Get-User', true, 422, {}, clientError.user.userDontExist);
        }
    } catch (err) {
        response(req, res, activity, 'Level-3', 'Get-User', false, 500, {}, errorMessage.internalServer, err.message);
    } 
}


/**
 * @author Kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete Product.
 */
export let deleteProduct = async (req, res, next) => {
    try {
        const deleteData = await Product.findByIdAndUpdate({ _id: req.body._id }, { $set: { isDeleted: true } });
        response(req, res, activity, 'Level-2', 'Delete-User', true, 200, deleteData, clientError.success.deleteSuccess);
    } catch (err) {
        response(req, res, activity, 'Level-3', 'Delete-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}


