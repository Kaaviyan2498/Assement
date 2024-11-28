import * as crypto from "crypto";
import * as Config from "../config/Enviornment";
import * as CryptoJS from "crypto-js";
let password="PixaliveService";
let conversionOutput:string;



export let hashPassword = async (text) => {
  return await new Promise((resolve, reject) => {
    const hash = crypto.createHmac("sha256", Config.SERVER.SALT);
    hash.update(text.toString());
    resolve(hash.digest("hex"));
  });
};
export let encrypt = (textToConvert) => {
  return (conversionOutput = CryptoJS.AES.encrypt(
    textToConvert.trim(),
    password.trim()
  ).toString());
};

export let decrypt = (textToConvert) => {
  return (conversionOutput = CryptoJS.AES.decrypt(
    textToConvert.trim(),
    password.trim()
  ).toString(CryptoJS.enc.Utf8));
};