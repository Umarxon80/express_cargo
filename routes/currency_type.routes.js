import { Router } from "express";
import { AddCurrency_type, DeleteCurrency_type, GetAllCurrency_types, GetOneCurrency_type, PatchCurrency_type } from "../controllers/currency_type.controller.js";

const router=Router()
router.get("",GetAllCurrency_types)
router.get("/:id",GetOneCurrency_type)
router.post("",AddCurrency_type)
router.patch("/:id",PatchCurrency_type)
router.delete("/:id",DeleteCurrency_type)

export default router