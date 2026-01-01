import express, {Request, Response} from "express"
import { initDB, pool } from "./config/db"
import router from "./modules/users/users.route"
import routeAuth from "./modules/auth/auth.route"
import vehicleRouter from "./modules/vehicles/vehicles.route"


const app = express()
app.use(express.json())

initDB()

app.get('/', (req:Request, res:Response)=>{
    res.send("server ok")

})
//users signup
app.use('/api/v1/auth/signup', router);
//login
app.use('/api/v1/auth/', routeAuth)

app.use('/api/v1/users', router)



//vehicles
app.use('/api/v1/vehicles',  vehicleRouter);





export  default app;
