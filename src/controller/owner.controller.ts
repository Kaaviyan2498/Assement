import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp, sendOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { Owner, OwnerDocument } from "../model/owner.model";

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
export let ownerProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userData = await Owner.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!userData) {
                let date = new Date();
                const ownerDetails: OwnerDocument = req.body;
                const userotp =   Math.floor(1000 + Math.random() * 9999);
                console.log(userotp);   
                ownerDetails.otp = userotp ;
                const createData = new Owner(ownerDetails);
                let insertData = await createData.save();
                ownerDetails.createdOn = date ; 
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                 });
                const result = {}
                result['_id'] = insertData._id
                result['userName'] = insertData.ownerName;
                result['email'] = insertData.email;
                result['mobileNumber'] = insertData.mobileNumber;
                let finalResult = {};
                finalResult["SignUp"] = 'User';
                finalResult["ownerdetails"] = result;
                finalResult["token"] = token;
                sendOtp(insertData.mobileNumber,insertData.otp)
                response(req, res, activity, 'Level-2', 'User-Profile', true, 200, finalResult, clientError.success.registerSuccessfully);
                } else {
                    response(req, res, activity, 'Level-3', 'User-Profile', true, 422, {},clientError.mobile.mobileExist);
                }
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'User-Profile', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'User-Profile', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



