import { Request, Response } from "express"
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const loginDB = async(email:string, password:string)=>{
      
       const user = await pool.query(`SELECT  * from users  WHERE email=$1`, [email]);

       if(user.rows.length === 0){
        throw new Error("user not found ");
       }
       const matchPssword  = await bcrypt.compare(password, user.rows[0].password)

       if(!matchPssword){
        throw Error("invalid credentials");

       }
       return user;

};


export const authServices = {
    loginDB,
}