import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// registor new user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone_number } = req.body;
    try {
      await client.verify.v2
        ?.services(process.env.TWILIO_VERIFY_SERVICE_SID!)
        .verifications.create({ channel: "sms", to: phone_number });
      res.status(201).json({
        success: "true",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// verify otp
export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone_number, otp } = req.body;
    try {
      await client.verify.v2
        ?.services(process.env.TWILIO_VERIFY_SERVICE_SID!)
        .verificationChecks.create({ to: phone_number, code: otp });
      // if (response.valid) {
      res.status(200).json({
        success: "true",
        message: "OTP verified successfully☺️",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Somthing went wrong!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};
