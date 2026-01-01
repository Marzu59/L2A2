import { pool } from "../../config/db";


const vehiclescreateIntoDB = async (payload: Record<string, unknown>) => {

    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`
                  INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) 
                  RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status
                `, [vehicle_name, type, registration_number, daily_rent_price, availability_status])

 
            return result;

}

const getVehiclesIntoDB = async()=>{

     const result = await pool.query(`SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status  FROM  vehicles `);
     
     return result;


}

const getVehicleIDintoDB = async(id:number)=>{

    const result = await pool.query(`SELECT *  FROM vehicles  WHERE  id=$1`,[id] )
  
   return result;
      

}

const updateVehicleintoDB = async(type:string, registration_number:string, id:number)=>{

    const result = await pool.query(`
            UPDATE vehicles SET type=$1,  registration_number=$2 WHERE id=$3 RETURNING *
        `, [type, registration_number, id]);

        return result;

}

 const deleteVehicleintDB = async (id:number)=>{
         
        const  availability_status = "available";
             
        const result = await pool.query(`DELETE FROM vehicles WHERE id=$1   AND availability_status=$2 `, [id, availability_status]);

        return result;
        
 }



export const vehiclesService = {
    vehiclescreateIntoDB,
    getVehiclesIntoDB,
    getVehicleIDintoDB,
    updateVehicleintoDB,
    deleteVehicleintDB,


}