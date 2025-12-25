import axios from "axios";
import config from "config";

class SmsService{
    async sendSms(phone_number,otp){
        const formData=new FormData()
        formData.append("mobile_phone",phone_number)
        formData.append("from","4546")
        formData.append("message","Bu Eskiz dan test")
        const conf={
            method:"post",
            maxBodyLength:Infinity,
            url:config.get("sms_service_url"),
            headers:{
                Authorization:`Bearer ${config.get("sms_token")}`
            },
            data: formData
        }
        try {
            const responce=await axios(conf)
            return responce
        } catch (error) {
            return {error,status:500}
        }

    }

}

export default new SmsService