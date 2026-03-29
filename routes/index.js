import { Router } from "express";

import maxproroute from "./maxprofit.js";
import ngeroute from "./nge.js";

const router = Router();

router.use("/nextgreater", ngeroute);

router.use("/maxprofit", maxproroute);

export default router;
