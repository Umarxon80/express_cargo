import { Router } from "express";
import { AddClient, DeleteClient, Find_Client_by_ordered_date, GetAllClients, GetOneClient, PatchClient } from "../controllers/client.controller.js";

const router=Router()
router.get("",GetAllClients)
router.get("/search",Find_Client_by_ordered_date)
router.get("/:id",GetOneClient)
router.post("",AddClient)
router.patch("/:id",PatchClient)
router.delete("/:id",DeleteClient)

export default router