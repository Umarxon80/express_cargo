import { Router } from "express";
import Clientrouter from "./client.routes.js";

const router=Router()
router.use("/client",Clientrouter)


export default router