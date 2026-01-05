import { pool } from "./config/db";
import cron from "node-cron";
const systemAutomaticlalaymarKs = async ()=>{

    try{
          const today = new Date().toISOString().split("T")[0];
           
          const result = await pool.query(`
            UPDATE bookings 
                SET status = 'returned'
                WHERE    rent_end_date < $1
                AND status = 'active'
                RETURNING id, vehicle_id`,[today]);

             

    }

    catch(error:any){
        console.log(error.message)
    }
}



cron.schedule("0 0 * * *",()=>{
    console.log("time update ")

    systemAutomaticlalaymarKs()
});


//for testing
// cron.schedule("* * * * *", () => {
//   console.log("⏱️ cron running every minute");
//   systemAutomaticlalaymarKs();
// });