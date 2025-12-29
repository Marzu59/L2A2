import { Request, Response } from "express"
import { authServices } from "./auth.Service";

const loginUser = async (req:Request, res:Response)=>{
   
       const {email, password} = req.body;

        try{
             
             const result = await authServices.loginDB(email, password)
                //   console.log(result)

   

        return res.status(201).json({
            success: true,
          message: "user found",
          data: result
         })
             

        }
          
        catch(error:any){
           return res.status(500).json({
                 success: false,
                message: error.message,
            })
        }




};

export const  authControll = {
    loginUser,
}