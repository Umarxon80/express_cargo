import { Router } from "express";
import Clientrouter from "./client.routes.js";
import Statusrouter from "./status.routes.js";
import Currency_typerouter from "./currency_type.routes.js";
import Adminrouter from "./admin.routes.js";
import Orderrouter from "./order.routes.js";
import Operationrouter from "./operation.routes.js";
import Searchrouter from "./search.routes.js";
import authrouter from "./auth.routes.js";
import otprouter from "./otp.routes.js";

const router=Router()
router.use("/client",Clientrouter)
router.use("/status",Statusrouter)
router.use("/currency_type",Currency_typerouter)
router.use("/admin",Adminrouter)
router.use("/order",Orderrouter)
router.use("/operation",Operationrouter)
router.use("/search",Searchrouter)
router.use("/auth",authrouter)
router.use("/otp",otprouter)


export default router