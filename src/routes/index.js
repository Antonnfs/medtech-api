import { Router } from "express";
import {
   filterByDate,
   filterByScore,
   filterBySpecialty,
   handlePostErrors,
   makeAppointment,
} from "../controllers/index.js";

const router = Router();

router.get("/", filterBySpecialty, filterByScore, filterByDate);

router.post("/", handlePostErrors, makeAppointment);

export default router;
