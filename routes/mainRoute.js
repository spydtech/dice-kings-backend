
import express from 'express';
import { loginController } from "../Controllers/loginController.js";
import { registerController } from "../Controllers/registerController.js";
const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);

export default router;