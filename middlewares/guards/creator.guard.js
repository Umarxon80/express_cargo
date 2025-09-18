import { SendErrorResponse } from "../../helpers/send.error.response.js"


export default async(req,res,next)=>{
    try {      
        if (req.admin.is_creator==false) {
            return SendErrorResponse({message:"You are not creator"},res,401)
        }
        next()
    } catch (error) {
       SendErrorResponse(error,res,403) 
    }
 }