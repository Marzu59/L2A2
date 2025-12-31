
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../config";

const loginDB = async(email:string, password:string)=>{
      
       const user = await pool.query(`SELECT  * from users  WHERE email=$1`, [email]);

       if(user.rows.length === 0){
        throw new Error("user not found ");
       }
       const matchPssword  = await bcrypt.compare(password, user.rows[0].password)

       if(!matchPssword){
        throw Error("invalid credentials");

       }
      const jwtpayload= {
        id:   user.rows[0].id,
        name: user.rows[0].name,
        email:user.rows[0].email,
        phone:user.rows[0].phone,
        role: user.rows[0].role,

      };
      const token = jwt.sign(jwtpayload, config.jwt_secret as string, {expiresIn: "7d"} )

        // delete user.rows[0].password;

       return {token, user: user.rows[0]};

};


export const authServices = {
    loginDB,
}