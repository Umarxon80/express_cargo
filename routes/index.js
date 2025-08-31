import { Router } from "express";
import Clientrouter from "./client.routes.js";
import Statusrouter from "./status.routes.js";
import Currency_typerouter from "./currency_type.routes.js";
import Adminrouter from "./admin.routes.js";

const router=Router()
router.use("/client",Clientrouter)
router.use("/status",Statusrouter)
router.use("/currency_type",Currency_typerouter)
router.use("/admin",Adminrouter)


export default router