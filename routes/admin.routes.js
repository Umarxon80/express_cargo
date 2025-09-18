import { Router } from "express";
import { AddAdmin, DeleteAdmin, GetAllAdmins, GetOneAdmin, PatchAdmin } from "../controllers/admin.controller.js";
import selfGuard from "../middlewares/guards/self.guard.js";
import authGuard from "../middlewares/guards/auth.guard.js";
import creatorGuard from "../middlewares/guards/creator.guard.js";
import roleGuard from "../middlewares/guards/role.guard.js";

const router=Router()
router.get("",authGuard,roleGuard(["Admin"]), GetAllAdmins)
router.post("",authGuard,creatorGuard,AddAdmin)
router.get("/:id",authGuard,selfGuard, GetOneAdmin)
router.patch("/:id",authGuard,selfGuard, PatchAdmin)
router.delete("/:id",authGuard,selfGuard,DeleteAdmin)

export default router