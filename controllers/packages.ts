import { Request, Response } from "express";
import { Package } from "../models/packages";

//Get all packages
export const getPackages = async (req: Request, res: Response) => {
  const packages = await Package.find();

  res.json({
    ok: true,
    packages,
  });
};

//Add new package
export const addNewPackage = async (req: Request, res: Response) => {
  // const { name, location, status } = req.body;

  try {
    const newPackage = new Package(req.body);

    await newPackage.save();
    res.status(201).json({
      ok: true,
      newPackage,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Package duplicated",
    });
  }
};

//Update package status
export const updatePackageStatus = async (req: Request, res: Response) => {
  const { status, ids } = req.body;
  try {
    for (const id of ids) {
      const packageToUpdate = await Package.findById(id);
      if (packageToUpdate) {
        const newPackageStatus = packageToUpdate;
        newPackageStatus.status = status;
        await Package.findByIdAndUpdate(id, newPackageStatus);
      }
    }

    const packages = await Package.find();
    res.json({
      ok: true,
      package: packages.filter((p) => ids.includes(p.id)),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};
