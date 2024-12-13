
import mongoose, { Schema } from "mongoose";

const megaAdsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    Headeline : {
        type : String,
        required : true,
    },
    AdsImage : {
        type : String,
        required : true,
    },
});

export const MegaAds = mongoose.model("MegaAds", megaAdsSchema);
