import { Request, Response } from "express";
import { bookingService } from "./bookings.services";


const createBooking  = async(req:Request, res:Response)=>{
  
        try{

                   const userId = req.user?.id;
                //    console.log(userId, req.body.customer_id)
                    
                   if( req.user?.role !== "admin" &&   req.body.customer_id !== req.user?.id){
                   return res.status(401).json({
                        success: false,
                        message: "You are not authorized user of this site"

                    })
                   }
                   
                   const result = await bookingService.createBookingIntoDB(req.body)
                        
                      const mixedData = {...result.resultFinal.rows[0],  vehicle: {...result.result1.rows[0]}};
                   return res.status(201).json({
                      success: true,
                      message: "Booking created successfully",
                      data: mixedData,
                        

                   })

                    


        }


        catch(error:any){
            return  res.status(401).json({
                success: false,
                message: error.message
              })
             
        }
         


}

const getbookingsbyRole = async(req: Request, res: Response)=>{

     try{
          
        
       const result = await bookingService.getbookingbyroleFromdb(req, res);

         
        

     }

      catch(error:any){
            return  res.status(401).json({
                success: false,
                message: error.message
              })
             
        }

}



const updateBooking = async(req:Request, res:Response) =>{
  
   try{
            //  if(req.user?.role !== "admin" && req.user?.id !== req.params.bookingId){
            //          throw Error("you are not authorized")
            //  };
               
               
               const result = await bookingService.updateBookingintoDB(req, res);
                    
            //  return res.status(200).json({
            //    message: "updated",
            //    data:  
            //   }) 
              
           if(result?.isAdmin){
             return res.status(201).json({
               isAdmin: true,
               data: result.final
              })
           };

             return res.status(200).json({
               isAdmin: false,
               data2: result.final2
             })   
           

   }

   catch(error:any){
               return  res.status(401).json({
                success: false,
                message: error.message
              })

   }
    
  

}



export const bookingControll = {
     createBooking,
     getbookingsbyRole,
     updateBooking,

}