import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp, sendOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { User, UserDocument } from "../model/user.model";

var activity = "user"

/**
 * @author Kaaviyan G S
 * @date 26-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create user list .
 */ 

// 1. create api 
export let userProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userData = await User.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!userData) {
                let date = new Date();
                const userDetails: UserDocument = req.body;
                const userotp =   Math.floor(1000 + Math.random() * 9999);
                console.log(userotp);   
                userDetails.otp = userotp ;
                const createData = new User(userDetails);
                let insertData = await createData.save();
                userDetails.createdOn = date ; 
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                 });
                const result = {}
                result['_id'] = insertData._id
                result['userName'] = insertData.userName;
                result['email'] = insertData.email;
                result['mobileNumber'] = insertData.mobileNumber;
                let finalResult = {};
                finalResult["SignUp"] = 'User';
                finalResult["UserDetails"] = result;
                finalResult["token"] = token;
                sendOtp(insertData.mobileNumber,insertData.otp)
                response(req, res, activity, 'Level-2', 'User-Profile', true, 200, finalResult, clientError.success.registerSuccessfully);
                } else {
                    response(req, res, activity, 'Level-3', 'User-Profile', true, 422, {},clientError.email.emailNotVerified);
                }
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'User-Profile', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'User-Profile', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



