import { Router } from "express";
import { nextgreaterelement } from "../controllers/nge.js";

const router=Router();

router.post("/", nextgreaterelement);

export default router;