import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp, sendOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { StoreDocument, Store } from "../model/store.model";
import { Owner } from "../model/owner.model";

var activity = "owner"

/**
 * @author Kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create owner list .
 */ 

// 1. create api 
export let createStore = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const ownerData = await Owner.findOne({ $and: [{ isDeleted: false }, { ownerName: req.body.ownerName }] });
            if (ownerData) {
                const storeDetails: StoreDocument = req.body;
                const createData = new Store(storeDetails);
                let insertData = await createData.save();
                const result = {}
                result['_id'] = insertData._id;     
                result['storeName'] = insertData.name;
                result['location'] = insertData.location;
                result['mobileNumber'] = insertData.contactNo;
                let finalResult = {};
                finalResult["storeDetails"] = result;
                response(req, res, activity, 'Level-2', 'create-store', true, 200, finalResult, clientError.success.savedSuccessfully);
                } else {
                    response(req, res, activity, 'Level-3', 'create-store', true, 422, {},"Owner should not be registered");
                }
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'create-store', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'create-store', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



/**
 * @author Kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all store 
 */
export let getAllStore = async (req, res, next) => {
    try {
        const userList = await Store.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-store', true, 200, userList, clientError.success.success);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-store', false, 500, {}, errorMessage.internalServer, err.message);
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
export let updateStore = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const storeDetails: StoreDocument = req.body;
            const userData = await Store.findOne({ $and: [ { _id: storeDetails._id }, { isDeleted: false }] });
            if (userData) {
                const date = new Date(); 
                const updateUser = new Store(storeDetails) 
                let insertUser = await updateUser.updateOne({_id:storeDetails._id},{
                    $set: {
                        name: storeDetails.name,
                        contactNo: storeDetails.contactNo,
                        address: storeDetails.address, 
                        openingTime:storeDetails.openingTime,
                        closingTime:storeDetails.closingTime,
                        storeStatus:storeDetails.storeStatus,
                        payAtStoreCommission:storeDetails.payAtStoreCommission,
                        ecommerceCommission:storeDetails.ecommerceCommission,
                        upi:storeDetails.upi,           
                        modifiedOn: date,
                        modifiedBy: storeDetails.name
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



