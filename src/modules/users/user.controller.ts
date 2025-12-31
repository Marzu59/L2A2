

import express, { Request, Response } from "express"
import { userServices } from "./users.service"
import { pool } from "../../config/db"

const  createUser = async(req:Request, res:Response)=>{
    
   
     
    const result = await userServices.createuserIntoDB(req.body)

         
      try{
        return res.status(201).json({
            message: "user created",
             success: true,
             data: result.rows[0]
         })
       
      }

      catch(error:any){
             return res.status(404).json({
                success: false,
                message: error.message
             })
      }





}


 const getAllusers = async(req:Request, res:Response)=>{
                 
      try{const result =  await userServices.getAllusersIntoDB()

        return res.status(201).json({
            message: "user created",
             success: true,
             data: result.rows
         })

      }
      catch(error:any){
        return res.status(404).json({
                success: false,
                message: error.message
             })

      }
 }

export const userControllers= {
    createUser,
    getAllusers,
}