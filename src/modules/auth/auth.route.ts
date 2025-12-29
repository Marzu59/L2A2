import express from "express"
import { authControll } from "./auth.Controll";

const routeAuth = express.Router()


routeAuth.post('/signin', authControll.loginUser);





export default routeAuth;