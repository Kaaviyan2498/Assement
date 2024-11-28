import * as mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    _id?: any;
    userId?:any ;
    userName?: string;
    mobileNumber?: number;
    DOB?: String;
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

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId:{type:mongoose.Types.ObjectId},
    userName: { type: String },
    mobileNumber: { type: Number },
    DOB: { type: String },
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


export const User = mongoose.model("userList", userSchema);