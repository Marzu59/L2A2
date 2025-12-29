

import express, { Request, Response } from "express"
import { userServices } from "./users.service"

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


export const userControllers= {
    createUser,
}