import bcrypt from "bcryptjs"
import { pool } from "../../config/db";
import { Request, Response } from "express";
const createuserIntoDB = async(payload: Record<string, unknown>)=>{
    
     const {name, email, password, phone, role}  = payload;
        const hashPassword  = await bcrypt.hash(password as string, 12);
     
         const result = await  pool.query(`
         INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role 
        `, [name, email, hashPassword, phone, role])
      

         return result;

  
}
  const getAllusersIntoDB = async()=>{
            
               const result = await pool.query(`   SELECT id,name,email,phone,role  FROM users`);
               return result;
             
  }



  const updateUserByAdminOROwnIntoDB = async(id:number, payload:Record<string, unknown>)=>{
        const {name, email, phone, role} = payload;
          
          

      const result = await pool.query(`
               UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *
        `, [name, email, phone, role, id] );

        return result;


  }
  

  const deleteuserFromDB = async (id:number, res:Response)=>{
          
         const result1 = await pool.query(` SELECT * FROM bookings  WHERE   customer_id=$1   
                  `, [id]);

                   console.log(result1.rows)

                if(result1.rows.length){
               return res.status(201).json({
                message: " user  have booking .Your are not able to delete this user"
                })
                }

                   const resultFinal = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
                     
                   return resultFinal;

                   
             
             

  }

export const userServices = {
    createuserIntoDB,
    getAllusersIntoDB,
    updateUserByAdminOROwnIntoDB,
    deleteuserFromDB,
}