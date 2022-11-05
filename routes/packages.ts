import { Router } from "express";
import {
  addNewPackage,
  getPackages,
  updatePackageStatus,
} from "../controllers/packages";

const router = Router();

router.get("/", getPackages);
router.post("/", addNewPackage);
router.put("/", updatePackageStatus);

export default router;
