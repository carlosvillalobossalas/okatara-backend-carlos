"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageStatus = exports.addNewPackage = exports.getPackages = void 0;
const packages_1 = require("../models/packages");
//Get all packages
const getPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packages = yield packages_1.Package.find();
    res.json({
        ok: true,
        packages,
    });
});
exports.getPackages = getPackages;
//Add new package
const addNewPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { name, location, status } = req.body;
    try {
        const newPackage = new packages_1.Package(req.body);
        yield newPackage.save();
        res.status(201).json({
            ok: true,
            newPackage,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Package duplicated",
        });
    }
});
exports.addNewPackage = addNewPackage;
//Update package status
const updatePackageStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, ids } = req.body;
    try {
        for (const id of ids) {
            const packageToUpdate = yield packages_1.Package.findById(id);
            if (packageToUpdate) {
                const newPackageStatus = packageToUpdate;
                newPackageStatus.status = status;
                yield packages_1.Package.findByIdAndUpdate(id, newPackageStatus);
            }
        }
        const packages = yield packages_1.Package.find();
        res.json({
            ok: true,
            package: packages.filter((p) => ids.includes(p.id)),
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
});
exports.updatePackageStatus = updatePackageStatus;
//# sourceMappingURL=packages.js.map