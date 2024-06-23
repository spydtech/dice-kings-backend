
import express from 'express';
import { loginController } from "../Controllers/loginController.js";
import { registerController } from "../Controllers/registerController.js";
import { getUserDetailsController } from "../Controllers/getUserDetailsController.js"
import { requireAuth } from "../middleware/authMiddleware.js"

const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);
router.get('/user-details', requireAuth, getUserDetailsController)

export default router;