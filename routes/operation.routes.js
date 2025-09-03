import { Router } from "express";
import { AddOperation, DeleteOperation, GetAllOperations, GetOneOperation, PatchOperation } from "../controllers/operation.controller.js";

const router=Router()
router.get("",GetAllOperations)
router.get("/:id",GetOneOperation)
router.post("",AddOperation)
router.patch("/:id",PatchOperation)
router.delete("/:id",DeleteOperation)

export default router