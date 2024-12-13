import { Router } from "express";
import { createMegaAds, shareAllMegaAds, deleteMegaAds } from "../controller/Mega.controller.js";
import { upload } from "../middleware/multer.milddlware.js";
const router = Router();

router.route("/createAds").post(upload.fields([{
    name: "AdsImage", maxCount: 1
}]),
    createMegaAds);
router.route("/shareAds").get(shareAllMegaAds);
router.route("deletAds").post(deleteMegaAds);

export default router;