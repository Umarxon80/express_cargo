import { Router } from "express";
import { AddOrder, DeleteOrder, GetAllOrders, GetOneOrder, PatchOrder } from "../controllers/order.controller.js";

const router=Router()
router.get("",GetAllOrders)
router.get("/:id",GetOneOrder)
router.post("",AddOrder)
router.patch("/:id",PatchOrder)
router.delete("/:id",DeleteOrder)

export default router