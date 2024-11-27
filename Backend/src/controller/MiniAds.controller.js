import { asyncHandler } from "../utils/asynchandler";
import { MiniAds } from "../model/MiniAds.model.js";

const registerMiniAds = asyncHandler(async (req, res) => {
    const { name, description, stockURL } = req.body;
    
    if (!name || !description || !stockURL) {
        throw new Error("All field required")
    };
    const AdsImageLocal = await req.files?.AdsImage?.[0].path;
});

export { registerMiniAds }