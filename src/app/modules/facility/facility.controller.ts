import { Request, Response } from "express";
import { FacilityModel } from "./facility.model";

const createFacility = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await FacilityModel.create(data);
    return res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Facility added successfully",
      data: {
        _id: result._id,
        name: result.name,
        description: result.description,
        pricePerHour: result.pricePerHour,
        location: result.location,
        isDeleted: result.isDeleted,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};

const updateFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedFacility = await FacilityModel.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-__v -createdAt -updatedAt");

    if (!updatedFacility) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Facility not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Facility updated successfully",
      data: updatedFacility,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};
const deleteFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const facility = await FacilityModel.findById(id).select(
      "-__v -createdAt -updatedAt"
    );

    if (!facility) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Facility not found",
      });
    }

    facility.isDeleted = true;
    await facility.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Facility deleted successfully",
      data: facility,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};
const Facilities = async (req: Request, res: Response) => {
  try {
    const facilities = await FacilityModel.find({ isDeleted: false }).select(
      "-__v -createdAt -updatedAt"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Facilities retrieved successfully",
      data: facilities,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};
export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  Facilities,
};
