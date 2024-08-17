import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program
        .option("-e, --env <string>", "Modo del servidor", "dev")
        .option("-p, --prod <string>", "Modo del servidor", "prod")

program.parse();

const environment = program.opts().env;

dotenv.config({
  path: `.${environment}.env`,
});
console.log(environment);

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  PERSISTANCE: process.env.PERSISTANCE,
  ENVIRONMENT: process.env.ENVIRONMENT,
  JWT_SECRET: process.env.JWT_SECRET,
  mailer: {
    host: process.env.MAILER_HOST || "smtp.gmail.com",
    port: process.env.MAILER_PORT || 465,
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    },
  },
  sms: {
    account_sid: process.env.TWILIO_ACCOUNT_SID,
    auth_token: process.env.TWILIO_AUTH_TOKEN,
    phone_number: process.env.TWILIO_PHONE_NUMBER,
  },
};