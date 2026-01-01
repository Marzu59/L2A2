import express from "express"
import { vehiclesControll } from "./vehicles.controll";
import auth from "../../middleware/authMiddleWare";
import { roles } from "../auth/auth.constant";

const vehicleRouter =  express.Router()


vehicleRouter.post('/', auth(roles.admin), vehiclesControll.createVehicles);


vehicleRouter.get('/', vehiclesControll.getVehicles);

vehicleRouter.get('/:vehicleId', vehiclesControll.getVehicleID);
vehicleRouter.put('/:vehicleId', auth(roles.admin), vehiclesControll.updateVehicle);
vehicleRouter.delete('/:vehicleId', auth(roles.admin),  vehiclesControll.deleteVehicle );

export default vehicleRouter;