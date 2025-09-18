import { Router } from "express";
import { AddOrder, DeleteOrder, GetAllOrders, GetOneOrder, PatchOrder } from "../controllers/order.controller.js";
import authGuard from "../middlewares/guards/auth.guard.js";

const router=Router()
router.get("",authGuard, GetAllOrders)
router.get("/:id",authGuard,GetOneOrder)
router.post("",authGuard,AddOrder)
router.patch("/:id",authGuard,PatchOrder)
router.delete("/:id",authGuard,DeleteOrder)

export default router