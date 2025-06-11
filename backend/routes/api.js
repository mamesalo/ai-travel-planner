import express from "express";
import {
  autoComplete,
  generateTravelPlan,
  getPlacePhoto,
} from "../controller/index.js";

const router = express.Router();

router.post("/autocomplete", autoComplete);
router.post("/generate-travel-plan", generateTravelPlan);
router.get("/place-photo/:placename", getPlacePhoto);

export default router;
