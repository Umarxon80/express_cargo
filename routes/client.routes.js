import { Router } from "express";
import { AddClient, DeleteClient, GetAllClients, GetOneClient, PatchClient } from "../controllers/client.controller.js";

const router=Router()
router.get("",GetAllClients)
router.get("/:id",GetOneClient)
router.post("",AddClient)
router.patch("/:id",PatchClient)
router.delete("/:id",DeleteClient)

export default router