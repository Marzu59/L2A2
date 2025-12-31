import express from "express"
import { userControllers } from "./user.controller";
import auth from "../../middleware/authMiddleWare";
import { roles } from "../auth/auth.constant";

const router = express.Router();


router.post('/',  userControllers.createUser)

router.get('/', auth(roles.admin), userControllers.getAllusers )


export default router;