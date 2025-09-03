import { Router } from "express";
import { Search1, Search2, Search3 } from "../controllers/search.controller.js";

const router=Router()
router.get("/1",Search1)
router.get("/2",Search2)
router.get("/3",Search3)


export default router