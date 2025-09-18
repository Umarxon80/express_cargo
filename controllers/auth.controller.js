import bcrypt from "bcrypt";
import { SendErrorResponse } from "../helpers/send.error.response.js";
import { Admin } from "../models/admin.js";
import jwtService from "../services/jwt.service.js";
import config from "config";
export const login = async (req,res)=>{
    try {
       const {email,password}=req.body 
       const admin = await Admin.findOne({where: { email: email }});       
        if (!admin) {
        return SendErrorResponse({message:"Email yoki password noto'gri"},res,401)
       }
       const verifyPassword= await bcrypt.compare(password,admin.password)
       if (!verifyPassword) {
        return SendErrorResponse({message:"Email yoki password noto'gri"},res,401)
       }
       const payload={
        id:admin.id,
        email:admin.email,
        is_active:admin.is_active,
        is_creator:admin.is_creator,
        role:"Admin"
       }
       const tokens= jwtService.generateTokens(payload)

       const hashedRefreshToken=await bcrypt.hash(tokens.refreshToken,7)
       admin.refreshToken=hashedRefreshToken;
       await admin.save()
////

    //uncoughtExeption

    //    try {
    //     setTimeout(function(){
    //         throw new Error("uncoughtExeption")
    //     },1000)
    // } catch (error) {
    //     console.log(error);
    // }



    // unhandledRejection
    // new Promise((_,rej)=>{
    //     rej(new Error("unhandledRejection"))
    // });
/////
       res.cookie("refreshToken",tokens.refreshToken,{
        maxAge: config.get("cookie_refresh_token_time"),
        httpOnly:true})


       res.status(200).send({
        message:"Admin logged in",
        accessToken:tokens.accessToken
       })
        } catch (error) {
        SendErrorResponse(error,res,500)
    }


}


export const logout = async (req,res)=>{
    try {
        const {refreshToken}=req.cookies
        if (!refreshToken) {
            return SendErrorResponse({message:"No token in cookie"},res,400)
        }        
        const verifiedRefreshToken= await jwtService.verifyRefreshToken(refreshToken)
        const admin =await Admin.findByPk(verifiedRefreshToken.id)
        admin.refreshToken=null,
        await admin.save()

        res.clearCookie("refreshToken")
        res.send({
            message:"Admin logged out"
        })
    } catch (error) {
        SendErrorResponse(error,res,500)
    }
}

export const refreshAccessToken= async(req,res)=>{
    try {
        const {refreshToken}=req.cookies
        if (!refreshToken) {
                return SendErrorResponse({message:"No token in cookie"},res,400)
            } 
        const verifiedRefreshToken= await jwtService.verifyRefreshToken(refreshToken)
        const admin =await Admin.findByPk(verifiedRefreshToken.id)
        const compareRefreshToken= await bcrypt.compare(refreshToken,admin.refreshToken)

        if (!compareRefreshToken) {
            return SendErrorResponse({message:"Refresh token is incorrect"},res,400)
        }

        const payload={
        id:admin.id,
        email:admin.email,
        is_active:admin.is_active,
        is_creator:admin.is_creator,
        role:"Admin"
       }
       const tokens= jwtService.generateTokens(payload)
              
       const hashedRefreshToken=await bcrypt.hash(tokens.refreshToken,7)
       admin.refreshToken=hashedRefreshToken;
       await admin.save()
       res.cookie("refreshToken",tokens.refreshToken,{
        maxAge: config.get("cookie_refresh_token_time"),
        httpOnly:true})


       res.status(200).send({
        message:"Admin logged in",
        accessToken:tokens.accessToken
       })
    } catch (error) {
        SendErrorResponse(error,res,500)
    }
}