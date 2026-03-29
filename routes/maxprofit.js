import { Router } from "express";

import { maxprofit } from "../controllers/maxprofit.js";

const router=Router();

router.post("/", maxprofit);

export default router;