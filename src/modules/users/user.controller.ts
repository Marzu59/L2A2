

import express, { Request, Response } from "express"
import { userServices } from "./users.service"
import { pool } from "../../config/db"


const createUser = async (req: Request, res: Response) => {



  const result = await userServices.createuserIntoDB(req.body)


  try {
    return res.status(201).json({
      message: "user created",
      success: true,
      data: result.rows[0]
    })

  }

  catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message
    })
  }





}


const getAllusers = async (req: Request, res: Response) => {

  try {
    const result = await userServices.getAllusersIntoDB()

    return res.status(201).json({
      message: "user created",
      success: true,
      data: result.rows
    })

  }
  catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message
    })

  }
}



const updateuserByadminorOwnUsingWithID = async (req: Request, res: Response) => {

  try {
    const id = Number(req.params.userId);
    //  const  ne = req.user as Record<string, unknown>
    //  console.log(req.user?.role)
    if (req.user?.id !== id && req.user?.role !== "admin") {

      return res.status(403).json({
        success: false,
        message: "you are not allowed to update user",
      })

    }


    const result = await userServices.updateUserByAdminOROwnIntoDB(id, req.body);

    delete result.rows[0].password;

    return res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    })


  }
  catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message
    })

  }

}


const deleteuser = async (req: Request, res: Response) => {

  try {
    const id = Number(req.params.userId)

    const result = await userServices.deleteuserFromDB(id, res);



    return res.status(201).json({
      success: true,
      message: "User deleted successfully"

    })


  }

  catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    })

  }

}


export const userControllers = {
  createUser,
  getAllusers,
  updateuserByadminorOwnUsingWithID,
  deleteuser,
}