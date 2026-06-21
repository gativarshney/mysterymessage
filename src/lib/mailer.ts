import nodemailer from "nodemailer"

const GMAIL_USER = process.env.GMAIL_USER as string
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD as string

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  throw new Error("Please define GMAIL_USER and GMAIL_APP_PASSWORD in .env")
}

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
})
