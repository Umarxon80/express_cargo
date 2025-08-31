import { Router } from "express";
import { Addstatus, Deletestatus, GetAllstatuses, GetOnestatus, Patchstatus } from "../controllers/status.controller.js";

const router=Router()
router.get("",GetAllstatuses)
router.get("/:id",GetOnestatus)
router.post("",Addstatus)
router.patch("/:id",Patchstatus)
router.delete("/:id",Deletestatus)

export default router