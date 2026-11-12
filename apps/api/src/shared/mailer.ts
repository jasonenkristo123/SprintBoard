import nodemailer from "nodemailer";
import type { TSendEmail } from "./type/mail";

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export async function sendEmail({
    to,
    subject, 
    html
}: TSendEmail) {
    await transport.sendMail({
        from: `"Sprintboard <${process.env.SMTP_USER}>"`,
        to,
        subject,
        html,
    })
}