import { saveLog } from "../controller/logs.controller";
import { LogsDocument, Logs } from "../model/logs.model";
var nodemailer = require('nodemailer');
import axios from "axios";


/**
 * @param res {Function} Response 
 * @param success {Boolean} Http Status Code for the response
 * @param result {Object/Array} Result for the Response
 * @param message {string} Primary message for the response
 * @param extendedMessage {Object} Detailed Message for the error Message
 * @function commonResponse {Function} Used for Handling the Common Response
 */

export let response = function (req, res, activity, level, method, success, statusCode, result, message, extendedMessage?) {
    const LogsData: LogsDocument = new Logs();
    let date = new Date()
    LogsData.activity = activity;
    var trusted_proxies = ['177.144.11.100', '177.144.11.101'];
    LogsData.userId = (req.body.loginId) ? req.body.loginId : '';
    LogsData.url = req.baseurl;
    LogsData.time = date.getTime();
    LogsData.date = date;
    LogsData.level = level;
    LogsData.description = message;
    LogsData.method = method;
    LogsData.processStatus = (statusCode === 200) ? true : false;
    saveLog(LogsData);
    res.status(statusCode);
    return res.json({
        success: success,
        result: result || '',
        message: message || '',
        extendedMessage: extendedMessage || '',
        statusCode: statusCode
    });
}



export const sendEmail = async (req, toMail, subject?: any, text?: any) => {
    var sender = nodemailer.createTransport({
        service: 'outlook',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'info@Pixalive.me', 
            pass: 'Pale2468'
        }
    });

    var composemail = {
        from: 'info@Pixalive.me',
        to: toMail,
        subject: subject,
        text: text
    }

    await sender.sendMail(composemail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Mail send successfully' + info.response)
        }
    })
}

export function generate(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
        for (let i = 0; i < length; i++) 
        {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
    return  result;
    }


    export function convertUTCToIST(date) {
        // Parse the UTC timestamp string
        const utcDate = new Date(date);
    
        // Convert UTC time to IST
        const ISTOffset = 5.5; // IST offset is 5 hours 30 minutes ahead of UTC
        const ISTTime = new Date(utcDate.getTime() + (ISTOffset * 3600000));
    
        // Format the IST time string
        // const ISTTimeString = ISTTime.toISOString().replace('T', ' ').replace('Z', '+05:30');
    
        return ISTTime;
    }
    

    export const sendOtp = async (mobileNumber,otp) => {
        const url = 'https://2factor.in/API/V1/2372fa0e-5edd-11eb-8153-0200cd936042/SMS/+91'+mobileNumber + '/' + otp;
        try {
            const response = await axios.get(url);
        } catch (exception) {
            process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        }
    }
  
    export const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pixaliveadearns@gmail.com',
          pass: 'tcqkdycouumvjrac',
        },
    });

export let  sendEmailOtp=async(email,otp)=>{
          if(!email){throw new Error("email is not register")}
                    const mailOptions = {
                    from: 'pixaliveadearns@gmail.com',
                    to: email,
                    subject: 'Email Verification OTP',
                    text: `Your verification OTP: ${otp}`, 
                  };
            await transporter.sendMail(mailOptions);
    
    }
