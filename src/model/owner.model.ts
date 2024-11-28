import * as mongoose from "mongoose";

export interface OwnerDocument extends mongoose.Document {
    _id?: any;
    ownerId?:any ;
    ownerName?: string;
    mobileNumber?: number;
    email?: string;
    profileUrl?: string;
    otp?: number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const ownerSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    ownerId:{type:mongoose.Types.ObjectId},
    ownerName: { type: String },
    mobileNumber: { type: Number },
    email: { type: String, lowercase: true, trim: true },
    profileUrl: { type: String  , default:"'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'"},
    otp: { type: Number },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const Owner = mongoose.model("ownerlist", ownerSchema);