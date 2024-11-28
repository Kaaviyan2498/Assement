import * as mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
    _id?: any;
    ownerId?:any ;
    productOwnerName?: string;
    productName?: string;
    discountType?: number;
    discountValue?: number;
    originalPrice?:number;
    price?: number;
    stock?: string;
    unit?: string;
    unitType?: number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    ownerId:{type:mongoose.Types.ObjectId},
    productOwnerName: { type: String },
    productName: { type: String },
    discountType:{type:Number},
    discountValue:{type:Number},
    originalPrice:{type:String},
    price:{type:Number},
    stock:{type:String},
    unit:{type:String},
    unitType:{type:Number , default:1},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const Product = mongoose.model("product", productSchema);