"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const packages_1 = require("../controllers/packages");
const router = (0, express_1.Router)();
router.get("/", packages_1.getPackages);
router.post("/", packages_1.addNewPackage);
router.put("/", packages_1.updatePackageStatus);
exports.default = router;
//# sourceMappingURL=packages.js.map