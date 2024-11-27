import mongoose, { Schema } from "mongoose";

const miniAdsSchema = new Schema({
     name : {
        type : String
     },
     description : {
        type : String
     },
     stockURL : {
        type : String
     },
     AdsImage : {
        type : String
     }
}, { timestamps: true });

export const MiniAds = mongoose.model("MiniAds", miniAdsSchema)