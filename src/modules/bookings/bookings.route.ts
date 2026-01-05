import express from "express"
import auth from "../../middleware/authMiddleWare";
import { roles } from "../auth/auth.constant";
import { bookingControll } from "./bookings.controller";

const bookingsRouter = express.Router();


bookingsRouter.post('/', auth(roles.admin, roles.customer), bookingControll.createBooking);
bookingsRouter.get('/', auth(roles.admin, roles.customer),  bookingControll.getbookingsbyRole);
bookingsRouter.put('/:bookingId', auth(roles.admin, roles.customer),bookingControll.updateBooking   );
export default bookingsRouter;