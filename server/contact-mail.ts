// lib/contact-mail.ts
import nodemailer from "nodemailer";
import { getSettingDetails } from "./data";

export async function sendContactMail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const appSettings = await getSettingDetails();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: appSettings.NOTIFY_EMAIL,
        pass: appSettings.NOTIFY_EMAIL_PASS,
      },
    });

    // Basic escaping + keep line breaks
    const safeMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: `"Contact Form" <${appSettings.NOTIFY_EMAIL}>`,
      to: appSettings.NOTIFY_EMAIL,
      replyTo: email, // so you can reply directly
      subject: `New contact message from ${name}`,

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

      <!-- Header / Logo -->
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
        text-align:left;
        color:#111827;
        margin-bottom:4px;
        font-size:22px;
      ">
        Contact us
      </h2>

      <p style="
        color:#6b7280;
        font-size:14px;
        margin-top:0;
        margin-bottom:18px;
      ">
        Share your thoughts by sending message to us.
      </p>

      <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0 24px;" />

      <!-- Details -->
      <h3 style="color:#111827; font-size:18px; margin-bottom:10px;">
        New contact message
      </h3>

      <table style="width:100%; font-size:15px; color:#374151; line-height:1.6;">
        <tr>
          <td style="font-weight:bold; width:120px;">Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Email:</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td style="font-weight:bold; vertical-align:top; padding-top:10px;">Message:</td>
          <td style="padding-top:10px;">
            ${safeMessage}
          </td>
        </tr>
      </table>

      <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

      <!-- Footer -->
      <p style="
        font-size:12px;
        color:#6b7280;
        text-align:center;
        margin-top:20px;
      ">
        This is an automated message from your contact form.<br/>
        © ${new Date().getFullYear()} 1Technologies ltd. All rights reserved.
      </p>

    </div>
  </div>
`,
    });

    return { success: true };
  } catch (err) {
    console.error("CONTACT MAIL ERROR:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}
