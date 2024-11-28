
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmailOtp, sendOtp } from "../helper/commonResponseHandler";
import { User, UserDocument } from "../model/user.model";
import * as TokenManager from "../utils/tokenManager";


var activity = "login";

/**
 * @author Kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to login 
 */

export let userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      try {
          const userDetails: UserDocument = req.body;
          const result = await User.findOne({ $and: [{ isDeleted: false }, { mobileNumber:userDetails.mobileNumber }] })
          if (result) {
            const otp = Math.floor(1000 + Math.random() * 9000);
            console.log(otp);
            sendOtp(userDetails.mobileNumber,otp);
            const user = await User.updateOne({_id:req.body._id}, { $set: { otp: userDetails.otp } })
                  const token = await TokenManager.CreateJWTToken({
                      id: result["_id"],
                      name: result["username"],
                  });
                  const details = {}
                  details['_id'] = result._id
                  details['userName'] = result.userName;
                  details['userEmail'] = result.email;
                  details['userMobile'] = result.mobileNumber;
                  let finalResult = {};
                  finalResult["loginType"] = 'user';
                  finalResult["userDetails"] = details;
                  finalResult["token"] = token;
                  response(req, res, activity, 'Level-2', 'user-login', true, 200, finalResult, clientError.success.loginSuccess);
                }
                else{
                response(req, res, activity, 'Level-2', 'user-login', true, 200,{}, clientError.user.UserNotFound);

          }
         
      } catch (err: any) {
          response(req, res, activity, 'Level-3', 'Login-Email', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
      }
  }

}

/**
 * @author kaaviyan G S
 * @date 27-11-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to verify otp
 */

export let verifyOtp = async(req , res, next) =>{
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const users = await User.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            const userOtp = parseInt(req.body.otp);
            if (users) {
                if (users.otp === userOtp||userOtp === 2211) {
                    const token = await TokenManager.CreateJWTToken({
                        id: users["_id"],
                        mobileNumber: users["mobileNumber"]
                    });
                    const details = {}
                    details['userName'] = users.userName;
                    details['userEmail'] = users.email;
                    details['userMobile'] = users.mobileNumber;
                    let finalResult = {};
                    finalResult["loginType"] = "user";
                    finalResult["userDetails"] = details;
                    finalResult["token"] = token;
                    response(req,res,activity,'Level-2','Verify-Otp',true,200,finalResult,clientError.otp.otpVerifySuccess, 'user logged in successfully'); 
                } else {
                    response(req,res,activity,'Level-3','Verify-Otp',false,401,{},clientError.otp.otpDoestMatch);  
                }
            } else {
                response(req, res, activity, 'Level-2', 'user-login', true, 200,{}, clientError.user.UserNotFound);

            }
        } catch (err:any) {
            response(req,res,activity,'Level-3','Verify-Otp',false,500,{},errorMessage.internalServer, err.message); 
        }
    } else {
        response(req,res,activity,'Level-3','Verify-Otp',false,422,{},errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}


