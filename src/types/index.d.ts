// import { JwtPayload } from "jsonwebtoken";
import { jwtpayLoadType } from "./typeforJwtpayload";


declare global {
    namespace Express{
        interface Request{
            user?: jwtpayLoadType
        }
    }
}