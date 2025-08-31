import { Router } from "express";
import { AddAdmin, DeleteAdmin, GetAllAdmins, GetOneAdmin, PatchAdmin } from "../controllers/admin.controller.js";

const router=Router()
router.get("",GetAllAdmins)
router.get("/:id",GetOneAdmin)
router.post("",AddAdmin)
router.patch("/:id",PatchAdmin)
router.delete("/:id",DeleteAdmin)

export default router