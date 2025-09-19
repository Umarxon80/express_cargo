import { addMinutesToDate } from "../helpers/add_minutes.js";
import { SendErrorResponse } from "../helpers/send.error.response.js";
import otpGenerator from "otp-generator";
import { Otp } from "../models/otp.js";
import { decode, encode } from "../helpers/crypt.js";
import { Client } from "../models/client.js";
export const newOtp = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const otp = otpGenerator.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = addMinutesToDate(now, 3);
    const newOtpRow = await Otp.create({ otp, expiration_time });

    // from sms or email or bot
    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpRow.id,
    };
    const encodedData = await encode(JSON.stringify(details));

    res.send({
      message: "Otp is sent",
      verification_key: encodedData,
    });
  } catch (error) {
    SendErrorResponse(error, res, 500);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { verification_key, otp, phone_number } = req.body;
    const currentTime = new Date();
    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);
    if (details.phone_number != phone_number) {
      return SendErrorResponse({
        message: "OTP wasn't send to this phone number"},
        res,
        400
      );
    }
    const otpRow= await Otp.findByPk(details.otp_id);
    if (!otpRow) {
        return SendErrorResponse({
            message: "OTP doesn't exists"},
            res,
            400
          );
    }
    if (otpRow.verified) {
        return SendErrorResponse({
            message: "OTP is alread used"},
            res,
            400
          );
    }
    if (otpRow.expiration_time<currentTime) {
        return SendErrorResponse({
            message: "OTP is expired"},
            res,
            400
          );
    }
    if (otpRow.otp!=otp) {
        return SendErrorResponse({
            message: "Wrong otp"},
            res,
            400
          );
    }
    otpRow.verified=true
    await otpRow.save()
    const clientRow=await Client.findOne({where:{phone_number}})
    let clientId,isNewClient;
    if (clientRow) {
        clientId=clientId.id;
        isNewClient=false;
    }else{
        const NewClient = await Client.create({phone_number})
        clientId=NewClient.id;
        isNewClient=true;
    }
    res.send({
        message:"Success",
        clientId,
        isNewClient
    })
  } catch (error) {
    SendErrorResponse(error, res, 500);
  }
};
