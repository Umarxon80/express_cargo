import { SendErrorResponse } from "../../helpers/send.error.response.js"


export default async(req,res,next)=>{
    try {
        if (req.params.id !=req.admin.id  && req.admin.is_creator==false) {
            return SendErrorResponse({message:"Only personal info is allowed"},res,401)
        }
        next()
    } catch (error) {
       SendErrorResponse(error,res,403) 
    }
 }