import { asyncHandler } from "../utils/asynchandler.js";
import { MegaAds } from "../model/MegaAds.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createMegaAds = asyncHandler(async (req, res) => {
    const { title, Headeline } = req.body;

    if (!title || !Headeline) {
        throw new Error("All fields are required");
    }

    const AdsImageLocal = await req.files.AdsImage[0].path;

    const AdsImage = await uploadOnCloudinary(AdsImageLocal);

    if (!AdsImage) {
        throw new Error("Failed to upload Ads Image");
    }

    const megaAds = await MegaAds.create({ title, Headeline, AdsImage: AdsImage.url });

    res.status(201).json({
        success: true,
        message: "Mega Ads created successfully",
        data: megaAds,
    });
});

const shareAllMegaAds = asyncHandler(async (req, res) => {
    const megaAds = await MegaAds.find();
    res.status(200).json({
        success: true,
        data: megaAds,
    });
});

const deleteMegaAds = asyncHandler(async (req, res) => {
    const { Id } = req.body;
    const deleteAds = await MegaAds.findByIdAndDelete(Id);

    if (!deleteAds) {
        return res.status(400).json({ success: false, message: "Can't delete the Ads || again" })
    };

    res.status(200).json({ success: true, message: "megaAds delete succesfully" });
});

export { createMegaAds, shareAllMegaAds, deleteMegaAds }