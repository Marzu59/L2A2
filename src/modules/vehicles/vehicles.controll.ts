import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { vehiclesService } from "./vehicles.service";


const createVehicles = async (req: Request, res: Response) => {

  try {

    // const  {email }  = req.user  as JwtPayload;
    const result = await vehiclesService.vehiclescreateIntoDB(req.body)

    return res.status(201).json({
      message: "Vehicle created successfully",
      data: result.rows
    })







  }
  catch (error: any) {

    return res.status(401).json({
      message: error.message,
      success: false
    })


  }


}


const getVehicles = async (req: Request, res: Response) => {



  try {


    const result = await vehiclesService.getVehiclesIntoDB();

    if (result.rows.length === 0) {
      return res.status(200).json({
        "success": true,
        "message": "No vehicles found",
        "data": []
      })
    }

    return res.status(201).json({
      message: "Vehicle retrived successfully",
      data: result.rows
    })


  }
  catch (error: any) {

    return res.status(401).json({
      message: error.message,
      success: false
    })


  }

}






const getVehicleID = async (req: Request, res: Response) => {


  try {
    // console.log(req.params.vehicleId)
    const id = Number(req.params.vehicleId);

    const result = await vehiclesService.getVehicleIDintoDB(id)

    return res.status(201).json({
      message: "vehicles retrive successfully",
      data: result.rows[0]
    })

  }

  catch (error: any) {

    return res.status(401).json({
      message: error.message,
      success: false
    })
  }

}


const updateVehicle = async (req: Request, res: Response) => {



  try {
    const { type, registration_number } = req.body;
    const id = Number(req.params.vehicleId);

    const result = await vehiclesService.updateVehicleintoDB(type, registration_number, id)

    if (result.rows.length === 0) {

      throw new Error("user not found")

    }

    return res.status(200).json({
      message: "Vehicle updated successfully",
      data: result.rows[0]
    })



  }
  catch (error: any) {
    return res.status(401).json({
      message: error.message,
      success: false
    })

  }

}


const deleteVehicle = async (req: Request, res: Response) => {

  try {
    const id = Number(req.params.vehicleId);
    const result = await vehiclesService.deleteVehicleintDB(id);

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      // data: result.rows[0]
    })


  }

  catch (error: any) {
    return res.status(401).json({
      message: error.message,
      success: false
    })

  }


}



export const vehiclesControll = {
  createVehicles,
  getVehicles,
  getVehicleID,
  updateVehicle,
  deleteVehicle,
}