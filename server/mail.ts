// lib/mail.ts
import { getSettingDetails } from "./data";
import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, token: string) {
  const appSettings = await getSettingDetails();

  // You can still take host/port from env or also move them to DB if you like
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for port 465
    auth: {
      user: appSettings.NOTIFY_EMAIL,
      pass: appSettings.NOTIFY_EMAIL_PASS,
    },
  });

  const resetUrl = `${appSettings.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Support" <${appSettings.NOTIFY_EMAIL}>`,
    to,
    subject: "Reset your password",
    html: `
  <div style="font-family:Arial, sans-serif; background:#f5f7fa; padding:20px;">

    <!-- Card -->
    <div style="
      max-width:600px;
      margin:auto;
      background:white;
      border-radius:12px;
      padding:30px;
      box-shadow:0 4px 15px rgba(0,0,0,0.1);
      border:1px solid #e5e7eb;
    ">

      <!-- Logo + Name -->
      <div style="
        display:flex;
        align-items:center;
        justify-content:center;
        gap:6px;
        margin-bottom:20px;
      ">
        <img 
          src="https://harlequin-defeated-cobra-480.mypinata.cloud/ipfs/bafkreidcnlfdhqjilorhub42btrmkwgm44zrvh6kybeyxdsryla72vhcie"
          alt="1Technologies Logo" 
          width="40"
          height="40"
          style="display:block;"
        />
        <h1 style="
          margin:0;
          font-size:22px;
          font-weight:700;
          color:#fe6b6e;
        ">
          1<span style="color:#07a9c3;">Technologies</span>
        </h1>
      </div>

      <!-- Title -->
      <h2 style="
        text-align:center;
        color:#111827;
        margin-bottom:10px;
        font-size:20px;
      ">
        Password Reset Request
      </h2>

      <p style="font-size:15px; color:#374151; line-height:1.6;">
        Hello,
      </p>

      <p style="font-size:15px; color:#374151; line-height:1.6;">
        We received a request to reset your password. You can reset it by clicking the button below.
      </p>

      <!-- Button -->
      <div style="text-align:center; margin:25px 0;">
        <a 
          href="${resetUrl}" 
          style="
            background:#07a9c3;
            color:white;
            padding:12px 22px;
            font-size:15px;
            font-weight:600;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
          "
        >
          Reset Password
        </a>
      </div>

      <p style="font-size:14px; color:#6b7280; line-height:1.6;">
        This link will expire in <strong>1 hour</strong>.  
        If you didn’t request a password reset, you can safely ignore this email.
      </p>

      <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

      <!-- Footer -->
      <p style="
        font-size:12px; 
        color:#6b7280; 
        text-align:center;
        margin-top:20px;
      ">
        This is an automated message from your 1Technologies account.<br/>
        © ${new Date().getFullYear()} 1Technologies ltd. All rights reserved.
      </p>

    </div>
  </div>
`,
  };

  await transporter.sendMail(mailOptions);
}
