import nodemailer from "nodemailer";

const { port_number, is_secure } =
  process.env.NODE_ENV !== "production"
    ? { port_number: 587, is_secure: false }
    : { port_number: 465, is_secure: true };

const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_HOST,

  port: port_number,
  secure: is_secure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

console.log("transporter:", transporter);

export default transporter;
