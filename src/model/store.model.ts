import * as mongoose from "mongoose";

export interface StoreDocument extends mongoose.Document {
    _id?:any;
    name?:string;
    ownerName?:string;
    storeCategory?:string;
    location?:string;
    address?:any;
    contactNo?:number;
    openingTime?:String;
    closingTime?:String;
    storeStatus?:number;
    ecommerceCommission?:number;
    payAtStoreCommission?:number
    upi?:String;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}    


const storeSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    name:{type:String},
    ownerName:{type:String},
    storeCategory:{type:String},
    location:{type:String},
    address:{
        Street:{type:String},
        area:{type:String},
        state:{type:String},
        pincode:{type:Number},
        country:{type:String},
        city:{type:String}
    },
    contactNo:{type:Number},
    openingTime:{type:String},
    closingTime:{type:String},
    storeStatus:{type:Number, default:2},
    payAtStoreCommission:{type:Number},
    ecommerceCommission:{type:Number},
    upi:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },

})

export const Store = mongoose.model("storeList", storeSchema);