import twilio from "twilio";
import { config } from "../config/config.js";

class SmsService {
  constructor() {
    this.client = twilio(config.sms.account_sid, config.sms.auth_token);
  }

  async sendSms(to, message) {
    const info = await this.client.messages.create({
      from: config.sms.phone_number,
      to,
      body: message,
    });

    console.log(info);
  }
}

export const smsService = new SmsService();