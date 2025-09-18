import { SendErrorResponse } from "../../helpers/send.error.response.js"



export default (roles=[])=>{
    return async (req,res,next)=>{
        try {

            if ( roles.includes(req.admin.role)) {
                next()
            }
            else{
                SendErrorResponse({message:"Not allowed"},res,401)
            }
        } catch (error) {
            SendErrorResponse(error,res,403)
        }
    }
}