import { Request, Response, response } from "express";
import { pool } from "../../config/db"
import {  jwtpayLoadType } from "../../types/typeforJwtpayload";

// import { jwtpayLoadType } from "../../types/typeforJwtpayload";


const createBookingIntoDB = async (payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const result1 = await pool.query(`SELECT daily_rent_price, vehicle_name FROM vehicles WHERE  id=$1`, [vehicle_id]);
    //    console.log(result1.rows)
    const dailyRentPrice = result1.rows[0].daily_rent_price;
    // const vehicleName = result1.rows[0].vehicle_name;
    // console.log(vehicleName)
    const startdate = new Date(rent_start_date as string);
    const enddate = new Date(rent_end_date as string);
    //   console.log(startdate, enddate)

    const miliSecPerDay = 1000 * 60 * 60 * 24;


    const number_of_days = (enddate.getTime() - startdate.getTime()) / miliSecPerDay;
    //   console.log(number_of_days)



    const total_price = dailyRentPrice * number_of_days;
    // console.log(total_price)
          
    const resultFinal = await pool.query(`  INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES($1, $2, $3, $4, $5) RETURNING   * `,[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price ] );
         
         const status = 'booked';
    const vehicleStatus = await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`, [status, vehicle_id ])

    return  {resultFinal, result1};


}


const getbookingbyroleFromdb = async(req:Request, res:Response)=>{
     
      const   user = req.user;
        const {id, role, name, email}   = user as jwtpayLoadType;

        
      
    //  console.log(id, role)

      if(user?.role == "admin"){
        const result1 = await pool.query(`SELECT * FROM bookings`);
        // console.log(result1.rows)
            const result1withVehicle = await pool.query(`SELECT * FROM vehicles`);
             const book = result1.rows;
                  const vehicls = result1withVehicle.rows;
              const finalData = book.map(single=>{
                   
                const  findmatchVehicles = vehicls.find((vehicle) =>  vehicle.id === single.vehicle_id );

                return  {...single, customer: {name, email},  vehicle:{vehicle_name: findmatchVehicles.vehicle_name, registration_number: findmatchVehicles.registration_number } }   
                
                 
              }  );
            //   console.log(finalData)

              return res.status(201).json({
                     message: "your data retrive successfullye",
                     data: finalData,
                        
                     

                })

        
      }
      //for customer


         const result2 = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1 `, [id]);
        //    console.log(result2.rows)
          const result2withVehicle = await pool.query(`SELECT * FROM vehicles`);
                  const book = result2.rows;
                  const vehicls = result2withVehicle.rows;

                  const finalDataForCustomerOwnData = book.map(single=>{
                           
                     const findmatchVehicles = vehicls.find(vehicle=> vehicle.id ===  single.vehicle_id );
                    //  console.log(findmatchVehicles)

                        return  {...single, vehicle:{ vehicle_name: findmatchVehicles.vehicle_name, registration_number: findmatchVehicles.registration_number }} 
                      


                  });

                  return res.status(201).json({
                     message: "your data retrive successfullye",
                     data: finalDataForCustomerOwnData,
                        
                });
              
        
            // console.log(finalDataForCustomerOwnData)
     
     
              
  
};


 const updateBookingintoDB = async (req:Request,res:Response)=>{
               const vehicleAvability = "available"
   
    if(req.user?.role === "admin"){
      const status = "returned"
         const result1 = await pool.query(`
          UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
          `, [status, req.params.bookingId]);
           const bookingResult = result1.rows[0];
           const bookingVehicleid = result1.rows[0].vehicle_id;
              // console.log(bookingResult)
        const vehicele = await pool.query(`UPDATE vehicles SET availability_status=$1   WHERE  id=$2 RETURNING *`, [vehicleAvability, bookingVehicleid]);
         const vehicleResult = vehicele.rows[0];
            const final= {...bookingResult, vehicele: {vehicle_availbility: vehicleResult.availability_status}};
            return { isAdmin:true, final: final};
       
    };
       


     const status = "cancelled";
      const result2 = await pool.query(` UPDATE bookings  SET status=$1  WHERE id=$2 RETURNING * `, [status, req.params.bookingId]);
       const result2booking = result2.rows[0];
       const vehicleId = result2.rows[0].vehicle_id;
         const vehicle2 = await pool.query(`UPDATE vehicles SET availability_status=$1   WHERE  id=$2 RETURNING *`, [vehicleAvability, vehicleId]);

             const final2 = {...result2booking}
               return {
                isAdmin: false,
                  final2: final2,
               };
         
    
   

 }





export const bookingService = {
    createBookingIntoDB,
    getbookingbyroleFromdb,
    updateBookingintoDB,

}