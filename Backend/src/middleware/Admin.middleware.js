import {User} from "../model/user.model.js";

const isAdmin = async (req, res, next) => {
    try {
        const userId = req.userId; 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAdmin !== true) {
            return res.status(403).json({ success: false, message: "Access denied. Admins only." });
        }

        next(); 
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export { isAdmin };