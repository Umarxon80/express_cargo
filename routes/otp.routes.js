import { Router } from "express";
import { newOtp, verifyOtp } from "../controllers/otp.controller.js";

const router=Router()

router.post("/new",newOtp)
router.post("/verify",verifyOtp)

export default router