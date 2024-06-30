
import express from 'express';
import { loginController,forgetPassword, verifyOTP } from "../Controllers/loginController.js";
import { registerController } from "../Controllers/registerController.js";
import { getUserDetailsController } from "../Controllers/getUserDetailsController.js"
import { requireAuth } from "../middleware/authMiddleware.js"
import { historyController,getAllHistory } from "../Controllers/historyController.js"

const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forget-password", forgetPassword);
router.post("/verify-otp", verifyOTP);

router.get('/user-details', requireAuth, getUserDetailsController)

router.post('/history', historyController)
router.get('/all-history', getAllHistory)


export default router;