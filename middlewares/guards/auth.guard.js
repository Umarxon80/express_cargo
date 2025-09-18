import { SendErrorResponse } from "../../helpers/send.error.response.js"
import jwtService from "../../services/jwt.service.js"


export default async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization
        if (!authHeader) {
            return SendErrorResponse({message:"Auth header is not found"}, res,401)
        }
        const token=authHeader.split(" ")[1]
        const Bearer=authHeader.split(" ")[0]
        if (Bearer!="Bearer" || !token) {
            return SendErrorResponse({message:"Token not found"}, res,401)
        }
        
        const verifyAccessToken=await jwtService.verifyAccessToken(token)
        req.admin=verifyAccessToken
        next()
    } catch (error) {
       SendErrorResponse(error,res,403) 
    }
 }