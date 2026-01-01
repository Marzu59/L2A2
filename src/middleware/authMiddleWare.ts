import { NextFunction, Request, Response } from "express";
 import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../config/db";
  const auth = (...roles: string[])=>{


    // return async(req:Request, res:Response, next:NextFunction)=>{
          
    //     //    const token  = req.headers.authorization?.split('')[1];
    //     const token = req.headers.authorization;

           
    //        if(!token){
    //         throw new Error("you are not authorized");
    //        }
    //        const decoded = jwt.verify(token, config.jwt_secret as string )  as JwtPayload;
    //     //    console.log(decoded)
    //     //    req.user = decoded;
    //             const user = await pool.query(`SELECT * FROM users  WHERE email=$1 `, [decoded.email])
    //             //  console.log(user.rows)
    //             if(user.rows.length === 0){
    //              throw new Error("user not found")
    //             }

    //             req.user = decoded;
                    
    //             if(roles.length && !roles.includes(decoded.role)){
    //                 throw new Error("you are not admin")
    //             }
                
          
    //         next()
     

    // }





        return async(req:Request, res:Response, next:NextFunction)=>{
          
           try{
            const token  = req.headers.authorization?.split(' ')[1];
        // const token = req.headers.authorization;

           
           if(!token){
            throw new Error("you are not authorized");
           }
           const decoded = jwt.verify(token, config.jwt_secret as string )  as JwtPayload;
        //    console.log(decoded)
        //    req.user = decoded;
                const user = await pool.query(`SELECT * FROM users  WHERE email=$1 `, [decoded.email])
                //  console.log(user.rows)
                if(user.rows.length === 0){
                 throw new Error("user not found")
                }

                req.user = decoded;
                    
                if(roles.length && !roles.includes(decoded.role)){
                    throw new Error("you are not authorized")
                }
                
          
            next()
           }

           catch(error){
            next(error)
           }
     

    }
  }

  export default auth;